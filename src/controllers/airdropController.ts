import express, {Request, Response} from "express";
import {AirdropService} from "../service/airdropService";

const airdropRouter = express.Router();
const airdropService = new AirdropService();

airdropRouter.post("/mint", airdropService.mint)

airdropRouter.post("/airdrop", airdropService.airdrop)

airdropRouter.post("/getNFTByAddress", airdropService.getNFTByAddress)


export default airdropRouter
