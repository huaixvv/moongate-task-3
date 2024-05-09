// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MoonNFT is ERC721Enumerable, Ownable {

    // record NFT of address
    mapping(address => uint256[]) private _ownedTokens;

    constructor() ERC721("MoonNFT", "MoonNFT") Ownable(msg.sender){}

    function mint(address to, uint256 tokenId) public onlyOwner {
        _mint(to, tokenId);
        _ownedTokens[to].push(tokenId);
    }

    function ownedTokens(address owner) public view returns (uint256[] memory) {
        return _ownedTokens[owner];
    }

    function sendNFT(address from, address to, uint256 tokenId) public onlyOwner {
        require(ownerOf(tokenId) == from, "Sender does not own the token");
        _transfer(from, to, tokenId);

        // Update the list of owned tokens for both sender and receiver
        _removeTokenFromOwnerEnumerationCustom(from, tokenId);
        _ownedTokens[to].push(tokenId);
    }

    function _removeTokenFromOwnerEnumerationCustom(address from, uint256 tokenId) private {
        uint256 lastTokenIndex = _ownedTokens[from].length - 1;
        uint256 tokenIndex;
        for (tokenIndex = 0; tokenIndex <= lastTokenIndex; tokenIndex++) {
            if (_ownedTokens[from][tokenIndex] == tokenId) {
                break;
            }
        }
        require(tokenIndex <= lastTokenIndex, "Token not found");

        if (tokenIndex < lastTokenIndex) {
            uint256 lastTokenId = _ownedTokens[from][lastTokenIndex];
            _ownedTokens[from][tokenIndex] = lastTokenId;
        }
        _ownedTokens[from].pop();
    }
}
