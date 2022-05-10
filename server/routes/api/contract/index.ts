import express, { Router } from "express";
import { mintStockToken_controller } from "../../controller/contract.controller";
import {} from "../../middleware";
const router = Router();

router.post("/mintStockToken", mintStockToken_controller);

export default router;
