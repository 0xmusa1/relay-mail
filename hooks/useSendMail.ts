"use client";

import { useEffect } from "react";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { useQueryClient } from "@tanstack/react-query";
import {
  RELAY_MAIL_ABI,
  RELAY_MAIL_ADDRESS,
} from "@/lib/contracts/relayMail";

export function useSendMail() {
  const queryClient = useQueryClient();

  const {
    writeContract,
    data: hash,
    isPending,
    error,
  } = useWriteContract();

  const {
    isSuccess,
    isLoading: isConfirming,
  } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (!isSuccess) return;

    queryClient.invalidateQueries();
  }, [isSuccess, queryClient]);

  async function sendMail(
  to: `0x${string}`,
  subject: string,
  message: string
) {
  console.log("sendMail()");
  console.log("to:", to);
  console.log("subject:", subject);
  console.log("message:", message);

  try {
    writeContract({
      address: RELAY_MAIL_ADDRESS,
      abi: RELAY_MAIL_ABI,
      functionName: "sendMail",
      args: [to, subject, message],
    });
  } catch (e) {
    console.error(e);
  }
}

  return {
    sendMail,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}