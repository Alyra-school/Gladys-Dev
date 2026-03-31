// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "./ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract AlyraNFT is ERC721A, Ownable {

    uint256 private constant MAX_SUPPLY = 10;
    uint256 private constant PRICE_PER_NFT = 0.00002 ether;
    uint256 private constant AMOUNT_NFT_PER_WALLET = 2;

    string public baseURI;
    using Strings for uint;

    mapping(address => uint256) amountNFTMintedPerWallet;

    constructor() ERC721A("AlyraNFT", "ANFT") Ownable(msg.sender) {
        baseURI = "ipfs://bafybeicdgx2rh7djzb23ejjwoq7g6gvjlus556b7mrzcfspxfffes3cw2i/";
    }

    function mint(uint256 _quantity) external payable {
        // 3 requires
        require(amountNFTMintedPerWallet[msg.sender] + _quantity <= AMOUNT_NFT_PER_WALLET, "Max NFTs per wallet exceeded");
        // à partir de totalSupply on peut savoir si on dépasse le MAX_SUPPLY
        require(totalSupply() + _quantity <= MAX_SUPPLY, "MAX NFTs limit exceeded");
        // il faut checker le msg.value que l'utilisateur nous envoie.
        require(msg.value >= PRICE_PER_NFT * _quantity, "Not enough funds provided");
        amountNFTMintedPerWallet[msg.sender] += _quantity;
        _safeMint(msg.sender, _quantity);
    }

    function setBaseURI(string memory _baseURI) external onlyOwner {
        baseURI = _baseURI;
    }

    //tokenURI(tokenId)
    //ipfs://CID/2.json

    // Le lien ipfs vers les fichiers json 
    // ipfs://bafybeicdgx2rh7djzb23ejjwoq7g6gvjlus556b7mrzcfspxfffes3cw2i/2.json
    function tokenURI(uint _tokenId) public view virtual override(ERC721A) returns(string memory) {
        require(_exists(_tokenId), "URI query for nonexistent token");
        return string(abi.encodePacked(baseURI, _tokenId.toString(), ".json"));
    }

}