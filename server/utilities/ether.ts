import { providers, Wallet, Contract, ethers } from "ethers";
// const provider = new providers.JsonRpcProvider('http://localhost:7545');

const networkUri =
  process.env.NODE_ENV === "production"
    ? process.env.RINKEBY_NETWORK
    : process.env.GANACHE_NETWORK;

const provider = new providers.JsonRpcProvider(networkUri);

const artifact = require("./../contracts/NgngToken.json");
const artifact2 = require("./../contracts/NgngNft.json");
const InputDataDecoder = require("ethereum-input-data-decoder");
const decoder = new InputDataDecoder([...artifact.abi, ...artifact2.abi]);

const erc20Address =
  process.env.NODE_ENV === "production"
    ? process.env.RINKEBY_ERC20_ADDRESS
    : process.env.GANACHE_ERC20_ADDRESS;

const erc721Address =
  process.env.NODE_ENV === "production"
    ? process.env.RINKEBY_ERC721_ADDRESS
    : process.env.GANACHE_ERC721_ADDRESS;

const OwnerPrivateKey =
  process.env.NODE_ENV === "production"
    ? process.env.RINKEBY_OWNER_PRIVATE_KEY
    : process.env.GANACHE_OWNER_PRIVATE_KEY;

const OwnerWallet = new Wallet(OwnerPrivateKey, provider);

const erc20_contract = new Contract(erc20Address, artifact.abi, OwnerWallet);
const erc721_contract = new Contract(erc721Address, artifact2.abi, OwnerWallet);

export const createWallet = () => {
  const signer = Wallet.createRandom();
  return signer?._signingKey()?.privateKey;
};

export const transferToken = async (
  privateKey1: string,
  privateKey2: string,
  amount: string
) => {
  const fromWallet = new Wallet(privateKey1, provider);
  const toWallet = new Wallet(privateKey2, provider);
  let transaction = await erc20_contract.p2pTransferFrom(
    fromWallet.address,
    toWallet.address,
    amount
  );
  let result = await transaction.wait();
  return result;
};

export const transferNFT = (
  privateKey1: string,
  privateKey2: string,
  tokenId: string
) => {
  const fromWallet = new Wallet(privateKey1, provider);
  const toWallet = new Wallet(privateKey2, provider);
  (async function () {
    let transaction = await erc721_contract.approve(toWallet.address, tokenId);
    let result = await transaction.wait();
    transaction = await erc721_contract.transferFrom(
      fromWallet.address,
      toWallet.address,
      tokenId
    );
    result = await transaction.wait();
  })();
};

export const getBalance = async (privateKey: string) => {
  console.log("privateKey", privateKey);
  const wallet = new Wallet(privateKey, provider);
  // console.log("wallet", wallet)
  let balance = await erc20_contract.balanceOf(wallet.address);
  // let result = await balance.wait();
  console.log(balance);
  return balance;
};

export const findNFT = async ({ privateKey }: { privateKey: string }) => {
  const wallet = new Wallet(privateKey, provider);
  let transaction = await erc721_contract.balanceOf(wallet.address);
  return transaction;
};

export const mintToken = async (
  privateKey: string,
  amount: null | string = "100"
) => {
  const wallet = new Wallet(privateKey, provider);

  let transaction = await erc20_contract.mintToken(
    wallet.address,
    ethers.utils.parseEther(amount)
  );
  let result = await transaction.wait();
};

export const mintNFT = async (privateKey: string) => {
  const recipient = new Wallet(privateKey, provider);
  let recipientAddress = recipient.address;
  let transaction = await erc721_contract.mintNFT(
    recipientAddress,
    "ngng NFT token uri"
  );
  let result = await transaction.wait();
  return result;
};

export const setToken = async () => {
  let transaction = await erc721_contract.setToken(erc20Address);
  await transaction.wait();
};

export const decodeFromAbi = async ({ input }: { input: string }) => {
  const decodeData = await decoder.decodeData(input);
  return decodeData;
};

export const getAddressFromPrivateKey = ({
  privateKey,
}: {
  privateKey: string;
}) => {
  const wallet = new Wallet(privateKey, provider);
  return wallet?.address;
};
