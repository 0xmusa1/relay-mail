"use client";

import { useAccount, useReadContract } from "wagmi";
import {
  RELAY_MAIL_ABI,
  RELAY_MAIL_ADDRESS,
} from "@/lib/contracts/relayMail";

export function useSent() {
  const { address } = useAccount();

  return useReadContract({
    abi: RELAY_MAIL_ABI,
    address: RELAY_MAIL_ADDRESS,
    functionName: "getSent",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });
}