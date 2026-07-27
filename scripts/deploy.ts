import { network } from "hardhat";

async function main() {
  const { viem } = await network.connect();

  const [deployer] = await viem.getWalletClients();

  console.log("Deploying with:", deployer.account.address);

  const relayMail = await viem.deployContract("RelayMail");

  console.log("RelayMail deployed at:");
  console.log(relayMail.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});