import { createConfig, http } from "wagmi";
import { injected, walletConnect } from "wagmi/connectors";
import { arcTestnet } from "./chains";

export const config = createConfig({
  chains: [arcTestnet],
  connectors: [
    injected(),
    walletConnect({
      projectId: "f34ae713e5780ddf1b543da0032625bd",
    }),
  ],
  transports: {
    [arcTestnet.id]: http("https://rpc.testnet.arc.network"),
  },
});