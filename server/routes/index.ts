const router = require("express").Router();
import contract from "./api/contract";
import stock from "./api/stock";

router.use("/contract", contract);
router.use("/stock", stock);

export default router;
