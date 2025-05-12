import { ethers } from "ethers";
import * as fs from "fs";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const provider = new ethers.JsonRpcProvider("http://localhost:8545");
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

  const abi = JSON.parse(fs.readFileSync("out/SimpleStorage.sol/SimpleStorage.json", "utf8")).abi;
  const bytecode = JSON.parse(fs.readFileSync("out/SimpleStorage.sol/SimpleStorage.json", "utf8")).bytecode.object;

  const factory = new ethers.ContractFactory(abi, bytecode, wallet);
  const contract = await factory.deploy();

  console.log("Contract deployed to:", contract.target);

  fs.writeFileSync("deployed.json", JSON.stringify({
    address: contract.target,
    abi: abi
  }, null, 2));
}

main().catch(console.error);
