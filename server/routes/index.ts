const router = require("express").Router();
import user from "./api/contract";
import {
  deployContract,
  callContract,
  sendContract,
  multiMint,
} from "./../utilities/KAS";
import { getDataFromStockCode } from "./../utilities/stockApi";

require("./../utilities/bithumbSocket");
// router.use("/user", user);

// multiMint();
export default router;
