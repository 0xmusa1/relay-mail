"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSendMail } from "@/hooks/useSendMail";

export default function SendMail() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const {
    sendMail,
    isPending,
    isConfirming,
    isSuccess,
    error,
  } = useSendMail();

  useEffect(() => {
    if (!isSuccess) return;

    toast.success("Mail sent successfully");

    setTo("");
    setSubject("");
    setMessage("");
  }, [isSuccess]);

  return (
    <div className="space-y-4 rounded-xl border border-zinc-800 p-6">
      <h2 className="text-xl font-bold">
        Send Mail
      </h2>

      <input
        className="w-full rounded bg-zinc-900 p-3"
        placeholder="Recipient Address"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />

      <input
        className="w-full rounded bg-zinc-900 p-3"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <textarea
        className="w-full rounded bg-zinc-900 p-3"
        rows={6}
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        disabled={isPending || isConfirming}
        onClick={() =>
          sendMail(
            to as `0x${string}`,
            subject,
            message
          )
        }
        className="rounded-lg bg-blue-600 px-6 py-3 transition hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending
          ? "Waiting Wallet..."
          : isConfirming
          ? "Confirming..."
          : "Send Mail"}
      </button>

      {error && (
        <p className="text-red-400">
          {error.message}
        </p>
      )}
    </div>
  );
}