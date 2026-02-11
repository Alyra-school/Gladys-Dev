// SPDX-License-Identifier: MIT
pragma solidity 0.8.31;

abstract contract Ownable {

    address owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }
}

contract Vault is Ownable {

    mapping(uint256 => uint256) deposits;
    uint256 depositId;
    uint256 time;

    function deposit() external payable onlyOwner() {
        require(msg.value > 0, "Not enough funds provided");
        depositId++;
        if(time == 0) {
            time = block.timestamp + 90 days;
        }
        deposits[depositId] = msg.value;
    }

    function withdraw() external onlyOwner {
        require(block.timestamp >= time, "Wait 3 months after the first deposit to withdraw");
        (bool sent,) = payable(msg.sender).call{value: address(this).balance}("");
        require(sent, "An error occured");
    }

}