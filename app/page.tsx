"use client";

import ConnectWallet from "@/components/ConnectWallet";
import SendMail from "@/components/SendMail";
import MailTabs from "@/components/MailTabs";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl p-10">

        <h1 className="mb-2 text-5xl font-bold">
          Relay Mail
        </h1>

        <p className="mb-10 text-zinc-400">
          Onchain messaging built on Arc Network
        </p>

        <div className="grid grid-cols-2 gap-8">

          <div className="space-y-8">

            <div className="rounded-xl border border-zinc-800 p-6">
              <h2 className="mb-4 text-xl font-bold">
                Wallet
              </h2>

              <ConnectWallet />
            </div>

            <SendMail />

          </div>

          <MailTabs />

        </div>

      </div>
    </main>
  );
}