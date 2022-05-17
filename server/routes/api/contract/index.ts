import express, { Router } from "express";
import {
  mintStockToken_controller,
  addressList_controller,
} from "../../controller/contract.controller";
import {} from "../../middleware";
const router = Router();

router.post("/mintStockToken", mintStockToken_controller);
router.get("/list", addressList_controller);

export default router;
