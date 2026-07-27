"use client";

import { useAccount, useReadContract } from "wagmi";
import {
  RELAY_MAIL_ABI,
  RELAY_MAIL_ADDRESS,
} from "@/lib/contracts/relayMail";

export function useInbox() {
  const { address } = useAccount();

  return useReadContract({
    abi: RELAY_MAIL_ABI,
    address: RELAY_MAIL_ADDRESS,
    functionName: "getInbox",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });
}