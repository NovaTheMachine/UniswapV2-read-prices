const ethers = require("ethers");

const {
  addressFactory,
  addressRouter,
  addressFrom,
  addressTo,
} = require("./AddressList");

const { erc20ABI, factoryABI, routerABI, pairABI } = require("./abiList");

const provider = new ethers.providers.JsonRpcProvider(
  "https://bsc-dataseed4.binance.org/"
);

const contractFactory = new ethers.Contract(
  addressFactory,
  factoryABI,
  provider
);

const contractRouter = new ethers.Contract(addressRouter, routerABI, provider);

const getPrices = async (amountInHuman) => {
  const ContractToken = new ethers.Contract(addressFrom, erc20ABI, provider);
  const decimals = await ContractToken.decimals();
  const amountIn = ethers.utils.parseUnits(amountInHuman, decimals).toString();
  

  const amountOut = await contractRouter.getAmountsOut(amountIn, [
    addressFrom,
    addressTo,
  ]);
//convert amount out - decimals
  const ContractToken2 = new ethers.Contract(addressTo, erc20ABI, provider);
  const decimals2 = await ContractToken.decimals();
//convert amount out - human
  const amountOutHuman = ethers.utils.formatUnits(amountOut[1].toString(), decimals2);
  console.log(amountOutHuman)
};

const amountInHuman = "500";

getPrices(amountInHuman);
