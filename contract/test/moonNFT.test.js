const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const {randomUUID, randomInt} = require("node:crypto");

describe("MoonNFT", async function () {

  let moonNFT
  const address = '0x5B2ad2126717d9C1a5493635cAFB00E88e23faa7'

  beforeEach(async () => {

    // deployed nft contract
    const moonNFTFactory = await ethers.getContractFactory('MoonNFT')
    moonNFT = await moonNFTFactory.deploy()
    console.log("heraToken deployed to:", moonNFT.target);

  })

  //test mint
  it("test mint", async () => {
    await moonNFT.mint(address, randomInt(1, 1000000000))
    await moonNFT.mint(address, randomInt(1, 1000000000))

    let res = await moonNFT.ownedTokens(address)
    console.log(res);
  });
});
