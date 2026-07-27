export function shortAddress(address?: string) {
  if (!address) return "";

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatDate(timestamp: bigint | number) {
  const date = new Date(Number(timestamp) * 1000);

  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}