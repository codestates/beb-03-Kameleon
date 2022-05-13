import { Request, Response, NextFunction } from "express";

const temp = async (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(401).json({
      success: false,
      data: null,
      message: err,
    });
  }
};

export { temp };
