import { Request, Response } from "express";
import { getPoolLiquidity } from "../../service/contract.service";
const mintStockToken_controller = async (req: Request, res: Response) => {
  try {
  } catch (err) {
    return res.status(500).json({
      success: false,
      data: null,
      error: err,
    });
  }
};

const addressList_controller = async (req: Request, res: Response) => {
  try {
  } catch (err) {
    return res.status(500).json({
      success: false,
      data: null,
      error: err,
    });
  }
};

const getPoolLiquidity_controller = async (req: Request, res: Response) => {
  try {
    const exchangeAddress = req.body.exchange as string;
    const { success, data } = await getPoolLiquidity({ exchangeAddress });
    if (success) {
      return res.status(200).json({
        success,
        data,
        error: null,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      data: null,
      error: err,
    });
  }
};

export {
  mintStockToken_controller,
  addressList_controller,
  getPoolLiquidity_controller,
};
