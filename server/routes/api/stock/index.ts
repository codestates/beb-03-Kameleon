import { Router } from "express";
import { getStocks_controller } from "../../controller/stock.controller";
const router = Router();

router.get("/getStocks", getStocks_controller);

export default router;
