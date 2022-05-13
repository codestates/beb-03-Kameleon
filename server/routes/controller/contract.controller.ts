import { Request, Response } from "express";
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

export { mintStockToken_controller };
