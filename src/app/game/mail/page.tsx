"use client";
import { useState, useEffect } from "react";
import { useUser } from "@/hooks/use-user";
import { Skeleton } from "@/components/skeleton";
import { logger } from "@/lib/logger";

interface MailItem {
  id: string; sender: string; subject: string; body: string; is_read: boolean;
  created_at: string; attachments?: Record<string, number>;
}

export default function MailPage() {
  const { user } = useUser();
  const [mail, setMail] = useState<MailItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<MailItem | null>(null);

  useEffect(() => {
    if (!user) return;
    fetch("/api/player/mail")
      .then(r => r.json())
      .then(d => setMail(d.mail || []))
      .catch((err) => logger.warn("Failed to load mail", "app/game/mail/page.tsx", "useEffect", err))
      .finally(() => setLoading(false));
  }, [user]);

  if (selected) {
    return (
      <div className="space-y-4">
        <button onClick={() => setSelected(null)} className="text-sm text-muted-foreground hover:text-foreground">&larr; Back to inbox</button>
        <div className="rounded-xl border bg-card p-6 space-y-4">
          <h2 className="text-xl font-bold">{selected.subject}</h2>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>From: {selected.sender}</span>
            <span>{new Date(selected.created_at).toLocaleDateString()}</span>
          </div>
          <p className="whitespace-pre-wrap">{selected.body}</p>
          {selected.attachments && Object.keys(selected.attachments).length > 0 && (
            <div className="rounded-lg bg-muted p-3">
              <p className="text-sm font-medium mb-1">Attachments:</p>
              {Object.entries(selected.attachments).map(([k, v]) => <p key={k} className="text-sm text-muted-foreground">{k}: x{v}</p>)}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <nav className="text-sm text-muted-foreground mb-2 flex items-center gap-1"><a href="/dashboard" className="hover:text-foreground">Home</a><span>/</span><span className="text-foreground">Messages</span></nav>
      <h1 className="text-2xl font-bold">Mail</h1>
      {loading ? (
        <div className="space-y-2">
          {Array.from({length: 5}).map((_, i) => <Skeleton key={i} className="h-16 rounded-xl" />)}
        </div>
      ) : mail.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <div className="text-5xl opacity-30">📬</div>
          <p className="text-muted-foreground">No messages</p>
          <p className="text-sm text-muted-foreground/60">When the kingdom sends you news or rewards, they will appear here.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {mail.map(item => (
            <button key={item.id} onClick={() => { setSelected(item); if (!item.is_read) fetch("/api/player/mail/"+item.id, { method: "PATCH" }).catch(()=>{}); }} className="w-full text-left rounded-xl border bg-card p-4 hover:bg-accent transition-colors">
              <div className="flex items-center justify-between">
                <p className={"font-medium " + (item.is_read ? "" : "text-primary")}>{item.subject}</p>
                <span className="text-xs text-muted-foreground">{new Date(item.created_at).toLocaleDateString()}</span>
              </div>
              <p className="text-sm text-muted-foreground truncate mt-1">{item.body}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
