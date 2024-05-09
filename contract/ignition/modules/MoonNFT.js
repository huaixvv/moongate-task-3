const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


module.exports = buildModule("MoonModule", (m) => {

  const MoonNFT = m.contract("MoonNFT")

  // m.call(HeraToken, "", [Faucet, ethers.parseEther("10000")], { id: "" })

  m.call(MoonNFT, "mint", ['0x5B2ad2126717d9C1a5493635cAFB00E88e23faa7', '1'], { id: "mint" })

  return {
    MoonNFT
  }
});
