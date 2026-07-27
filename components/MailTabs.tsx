"use client";

import { useState } from "react";
import Inbox from "./Inbox";
import Sent from "./Sent";

export default function MailTabs() {
  const [tab, setTab] = useState<"inbox" | "sent">("inbox");

  return (
    <div className="rounded-xl border border-zinc-800 p-6">
      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setTab("inbox")}
          className={`rounded-lg px-4 py-2 ${
            tab === "inbox"
              ? "bg-blue-600 text-white"
              : "bg-zinc-800 text-zinc-300"
          }`}
        >
          Inbox
        </button>

        <button
          onClick={() => setTab("sent")}
          className={`rounded-lg px-4 py-2 ${
            tab === "sent"
              ? "bg-blue-600 text-white"
              : "bg-zinc-800 text-zinc-300"
          }`}
        >
          Sent
        </button>
      </div>

      {tab === "inbox" ? <Inbox /> : <Sent />}
    </div>
  );
}