"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { shortAddress } from "@/lib/utils";

export default function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const visibleConnectors = connectors.filter(
    (connector) =>
      connector.name === "Injected" ||
      connector.name === "MetaMask" ||
      connector.name === "WalletConnect"
  );

  if (isConnected) {
    return (
      <div className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-green-500" />
          <p className="font-semibold text-green-400">
            Connected
          </p>
        </div>

        <p className="font-mono text-zinc-300">
          {shortAddress(address)}
        </p>

        <button
          onClick={() => disconnect()}
          className="rounded-lg bg-red-600 px-5 py-3 transition hover:bg-red-700"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {visibleConnectors.map((connector) => (
        <button
          key={connector.uid}
          onClick={() => connect({ connector })}
          className="w-full rounded-lg bg-blue-600 px-5 py-3 transition hover:bg-blue-700"
        >
          Connect with {connector.name}
        </button>
      ))}
    </div>
  );
}