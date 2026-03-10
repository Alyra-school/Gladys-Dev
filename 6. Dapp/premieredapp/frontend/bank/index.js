import { ethers } from "./ethers.min.js";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./constants.js";

const connectButton = document.getElementById('connectButton');
const balanceOfUser = document.getElementById('balanceOfUser');
const inputSendEthers = document.getElementById('inputSendEthers');
const buttonSendEthers = document.getElementById('buttonSendEthers');
const inputWithdrawEthers = document.getElementById('inputWithdrawEthers');
const buttonWithdrawEthers = document.getElementById('buttonWithdrawEthers');

let connectedAccount;

connectButton.addEventListener('click', async function() {
    try {
        if(typeof window.ethereum !== 'undefined') {
            // Metamask est installé
            const resultAccount = await window.ethereum.request({ method: "eth_requestAccounts" })
            connectedAccount = ethers.getAddress(resultAccount[0])
            connectButton.innerHTML = "Connected with " + connectedAccount.substring(0,4) + "..." + connectedAccount.substring(connectedAccount.length - 5);
            await getBalanceOfUser();
        }
        else {
            // Metamask n'est pas installé
            connectButton.innerHTML = "Please install Metamask";
        }
    }
    catch(error) {
        console.error("Connection error", error);
        connectButton.innerHTML = "Connection failed";
    }
})

buttonSendEthers.addEventListener('click', async function() {
    if(connectedAccount) {
        try {
            let ethersAmount = inputSendEthers.value;
            let weiAmount = ethers.parseEther(ethersAmount); // je convertis en Wei
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = await new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
            let transaction = await contract.sendEthers({ value: weiAmount });
            await transaction.wait();
            inputSendEthers.value = "";
            await getBalanceOfUser();
        }
        catch(e) {
            console.log(e);
        }
    }
})

buttonWithdrawEthers.addEventListener('click', async function() {
    if(connectedAccount) {
        try {
            let ethersAmount = inputWithdrawEthers.value;
            let weiAmount = ethers.parseEther(ethersAmount); // je convertis en Wei
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = await new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
            let transaction = await contract.withdraw(weiAmount);
            await transaction.wait();
            inputWithdrawEthers.value = "";
            await getBalanceOfUser();
        }
        catch(e) {
            console.log(e);
        }
    }
})

async function getBalanceOfUser() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = await new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
    let balance = await contract.getBalanceOfUser(connectedAccount);
    balanceOfUser.innerHTML = ethers.formatEther(balance) + " ETH";
}