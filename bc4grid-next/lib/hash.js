import { SHA256 as sha256 } from "crypto-js";


const hashPassword = (string) => {
    return sha256(string).toString();
  };


  export default hashPassword;