import moonNftABI from "../abi/moonNFTABI.json"
import {ethers} from "ethers";
require('dotenv').config()

const ACCOUNT_PRIVATE_KEY = process.env.ACCOUNT_PRIVATE_KEY as string;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS as string;

const NETWORK_URI = process.env.NETWORK_URI;
const SEPOLIA_URL = process.env.SEPOLIA_URL

export class AirdropJobStore {

  contract: ethers.Contract

  constructor() {

    // choose the network
    const provider = new ethers.JsonRpcProvider(SEPOLIA_URL);

    // 用私钥创建签名器
    const wallet = new ethers.Wallet(ACCOUNT_PRIVATE_KEY, provider);

    // 连接到合约
    this.contract = new ethers.Contract(CONTRACT_ADDRESS, moonNftABI.abi, wallet);
  }

  connectWallet() {
  }
}
