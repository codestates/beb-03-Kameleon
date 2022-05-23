import { Router } from "express";
import {
  getPoolLiquidity_controller,
  getPoolRoi_controller,
} from "../../controller/contract.controller";
const router = Router();

// router.post("/mintStockToken", mintStockToken_controller);
// router.get("/list", addressList_controller);
router.post("/getPoolLiquidity", getPoolLiquidity_controller);
router.get("/getPoolRoi", getPoolRoi_controller);

export default router;
