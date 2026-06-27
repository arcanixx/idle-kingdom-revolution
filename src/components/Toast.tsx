"use client";
import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface ToastItem { id: number; message: string; type: "success" | "error" | "info" | "warning"; }
interface ToastCtx { toasts: ToastItem[]; toast: (m: string, t?: ToastItem["type"]) => void; }
const Ctx = createContext<ToastCtx>({ toasts: [], toast: () => {} });

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const toast = useCallback((message: string, type: ToastItem["type"] = "info") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    const ms = type === "error" ? 5000 : 3000;
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), ms);
  }, []);
  return (
    <Ctx.Provider value={{ toasts, toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
        {toasts.map(t => (
          <div key={t.id} className={
            "pointer-events-auto px-4 py-2 rounded-lg shadow-lg text-sm font-medium animate-in slide-in-from-right " +
            (t.type === "success" ? "bg-green-600 text-white" :
             t.type === "error" ? "bg-red-600 text-white" :
             t.type === "warning" ? "bg-yellow-500 text-black" :
             "bg-blue-600 text-white")
          }>
            {t.message}
          </div>
        ))}
      </div>
    </Ctx.Provider>
  );
}
export const useToast = () => useContext(Ctx);
