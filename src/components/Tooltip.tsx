"use client";
import { useState, type ReactNode } from "react";

export function Tooltip({ text, children }: { text: string; children: ReactNode }) {
  const [show, setShow] = useState(false);
  let timer: ReturnType<typeof setTimeout>;
  return (
    <div className="relative inline-flex" onMouseEnter={() => { timer = setTimeout(() => setShow(true), 500); }} onMouseLeave={() => { clearTimeout(timer); setShow(false); }}>
      {children}
      {show && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-gray-900 text-white text-xs whitespace-nowrap z-50 shadow-lg">
          {text}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
        </div>
      )}
    </div>
  );
}
