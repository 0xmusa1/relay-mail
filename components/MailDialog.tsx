"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { toast } from "sonner";
import { useSendMail } from "@/hooks/useSendMail";
import { formatDate, shortAddress } from "@/lib/utils";

export type Mail = {
  from: string;
  to: string;
  subject: string;
  message: string;
  timestamp: bigint;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mail: Mail | null;
};

export default function MailDialog({
  open,
  onOpenChange,
  mail,
}: Props) {
  const [reply, setReply] = useState("");

  const {
    sendMail,
    isPending,
    isConfirming,
    isSuccess,
  } = useSendMail();

  useEffect(() => {
    if (!isSuccess) return;

    toast.success("Reply sent");
    setReply("");
    onOpenChange(false);
  }, [isSuccess, onOpenChange]);

  if (!mail) return null;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>

        <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm" />

        <Dialog.Content className="fixed left-1/2 top-1/2 flex max-h-[90vh] w-[90vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 flex-col rounded-2xl border border-zinc-800 bg-zinc-950 p-8 outline-none">

          <Dialog.Title className="text-3xl font-bold">
            {mail.subject}
          </Dialog.Title>

          <div className="mt-8 space-y-5">

            <div>
              <p className="text-xs text-zinc-500">From</p>
              <p className="font-mono text-blue-400">
                {shortAddress(mail.from)}
              </p>
            </div>

            <div>
              <p className="text-xs text-zinc-500">To</p>
              <p className="font-mono text-blue-400">
                {shortAddress(mail.to)}
              </p>
            </div>

            <div>
              <p className="text-xs text-zinc-500">Date</p>
              <p>{formatDate(mail.timestamp)}</p>
            </div>

          </div>

          <div className="mt-8 max-h-[35vh] overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <pre className="whitespace-pre-wrap break-words font-sans text-base leading-7 text-white">
              {mail.message}
            </pre>
          </div>

          <div className="mt-auto border-t border-zinc-800 pt-6">

            <h3 className="mb-3 text-lg font-semibold">
              Reply
            </h3>

            <textarea
              rows={6}
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Write your reply..."
              className="w-full rounded-lg bg-zinc-900 p-4 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="mt-4 flex justify-end gap-3">

              <Dialog.Close asChild>
                <button className="rounded-lg bg-zinc-800 px-5 py-3 transition hover:bg-zinc-700">
                  Close
                </button>
              </Dialog.Close>

              <button
                disabled={
                  isPending ||
                  isConfirming ||
                  reply.trim() === ""
                }
                onClick={() =>
                  sendMail(
                    mail.from as `0x${string}`,
                    `Re: ${mail.subject}`,
                    reply
                  )
                }
                className="rounded-lg bg-blue-600 px-6 py-3 transition hover:bg-blue-700 disabled:opacity-50"
              >
                {isPending
                  ? "Wallet..."
                  : isConfirming
                  ? "Sending..."
                  : "Send Reply"}
              </button>

            </div>

          </div>

        </Dialog.Content>

      </Dialog.Portal>
    </Dialog.Root>
  );
}