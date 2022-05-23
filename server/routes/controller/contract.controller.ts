import { Request, Response } from "express";
import {
  getPoolLiquidity_service,
  getRoiList_service,
} from "../../service/contract.service";
import { calcPoolRoi } from "../../utilities/poolLiquidity";
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
    const { success, data } = await getPoolLiquidity_service({
      exchangeAddress,
    });
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
const getPoolRoi_controller = async (req: Request, res: Response) => {
  try {
    const exchangeAddress = req.query.exchangeAddress as string;
    const { data } = await getRoiList_service({ exchangeAddress });
    const result = calcPoolRoi(data);
    console.log(result);
    return res.status(200).json({
      success: true,
      data: result,
      error: null,
    });
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
  getPoolRoi_controller,
};
