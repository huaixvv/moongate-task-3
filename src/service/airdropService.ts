import {Request, Response} from "express";
import {AIRDROP_HISTORY} from "../db/db";
import ApiResponse from "../utils/ApiResponse";
import {AirdropJobStore} from "../models/airdropJob";
import {NftIdUtil} from "../utils/NftIdUtil";
import {BigNumberish, formatEther, parseEther} from "ethers";

require("dotenv").config();


const CONTRACT_OWNER_ADDRESS = process.env.CONTRACT_OWNER_ADDRESS as string;
const CONVERT_NUMBER = 1000000000000000000;


export class AirdropService {

  /**
   * can only call by contract owner.
   * mint a nft to target address
   * @param req
   * @param res
   */
  async mint(req: Request, res: Response) {

    const {address} = req.body;

    // mock auto-increasing ID
    let tokenId = NftIdUtil.getMaxId();
    tokenId += 1;

    let airdropJobStore = new AirdropJobStore();
    const tx = await airdropJobStore.contract.mint(address, tokenId);
    await tx.wait();

    NftIdUtil.appendId(tokenId);
    ApiResponse.success(`mint success, nftId: ${tokenId}`).send(res);
  }

  /**
   * send nft to from owner to toAddress
   * @param req
   * @param res
   */
  async airdrop(req: Request, res: Response) {

    const {toAddress} = req.body;

    // check if had been airdropped
    // if (AIRDROP_HISTORY.get(toAddress)) {
    //   ApiResponse.error("address has been airdropped").send(res);
    //   return;
    // }

    let airdropJobStore = new AirdropJobStore();
    // get nfts of owner
    const owner_list = await airdropJobStore.contract.ownedTokens(CONTRACT_OWNER_ADDRESS);

    // send one nft from owner to target
    const tx = await airdropJobStore.contract.sendNFT(CONTRACT_OWNER_ADDRESS, toAddress, owner_list[owner_list.length - 1])
    await tx.wait();

    const address_list = await airdropJobStore.contract.ownedTokens(toAddress);
    const owner_list_changed = await airdropJobStore.contract.ownedTokens(CONTRACT_OWNER_ADDRESS);


    console.log("address_list", address_list);
    console.log("owner_list_changed", owner_list_changed);

    // set this address has been airdropped
    AIRDROP_HISTORY.set(toAddress, true)
    ApiResponse.success(address_list).send(res)
  }

  /**
   * get NFT from address
   * @param req
   * @param res
   */
  async getNFTByAddress(req: Request, res: Response) {

    const {address} = req.body;

    if (!address) {
      ApiResponse.error("address is empty").send(res);
    }

    let airdropJobStore = new AirdropJobStore();
    const list = await airdropJobStore.contract.ownedTokens(address);
    const data = list.map((item: BigNumberish) =>  CONVERT_NUMBER * Number(formatEther(item)))
    ApiResponse.success(data).send(res)
  }
}
