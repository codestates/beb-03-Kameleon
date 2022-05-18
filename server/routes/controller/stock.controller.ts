import { Request, Response } from "express";
import { stockPrice } from "../../utilities/naverApi";

const getStocks_controller = async (req: Request, res: Response) => {
  try {
    const price = await stockPrice();
    return res.status(200).json({
      success: true,
      data: price,
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

export { getStocks_controller };
