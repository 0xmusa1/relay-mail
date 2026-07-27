"use client";

import { useState } from "react";
import { useInbox } from "@/hooks/useInbox";
import { formatDate, shortAddress } from "@/lib/utils";
import MailDialog, { Mail } from "./MailDialog";

export default function Inbox() {
  const { data, isLoading, error } = useInbox();

  const [selectedMail, setSelectedMail] = useState<Mail | null>(null);
  const [open, setOpen] = useState(false);

  if (isLoading) {
    return <p className="text-zinc-400">Loading inbox...</p>;
  }

  if (error) {
    return <p className="text-red-400">{error.message}</p>;
  }

  const mails = [...((data ?? []) as Mail[])].reverse();

  if (mails.length === 0) {
    return (
      <p className="text-zinc-500">
        No messages yet.
      </p>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {mails.map((mail, index) => (
          <button
            key={index}
            onClick={() => {
              setSelectedMail(mail);
              setOpen(true);
            }}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-5 text-left transition hover:border-blue-500 hover:bg-zinc-800"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-zinc-500">
                  From
                </p>

                <p className="font-mono text-sm text-blue-400">
                  {shortAddress(mail.from)}
                </p>
              </div>

              <p className="text-xs text-zinc-500">
                {formatDate(mail.timestamp)}
              </p>
            </div>

            <h3 className="mt-4 text-lg font-bold">
              {mail.subject}
            </h3>

            <p className="mt-2 line-clamp-2 text-zinc-400">
              {mail.message}
            </p>
          </button>
        ))}
      </div>

      <MailDialog
  open={open}
  onOpenChange={setOpen}
  mail={selectedMail}
/>
    </>
  );
}