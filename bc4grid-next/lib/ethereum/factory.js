import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0xC60616e3Ea95e7FF1C6e27B8c3a59dfF9b17a316"
);

export default instance;
