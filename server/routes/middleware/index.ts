import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import {
  checkEmailVerifyFromId,
  getUserFromId,
} from "../../service/User.service";
import requestIp from "request-ip";
import path from "path";
import multer from "multer";
import { v4 as uuid } from "uuid";
import { getBalance } from "../../utilities/ether";
import { IUser } from "../../types";
import { ethers } from "ethers";

const loginRequired = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const token = req?.cookies['access-token'];
    let token = null;

    const bearerHeader = req?.headers["authorization"];
    if (process.env.NODE_ENV !== "production") console.log(bearerHeader);

    if (bearerHeader === undefined) throw "token not found";

    // db 에서 private key => balance 까지 빼는거

    const bearer = bearerHeader.split(" ");
    if (bearer.length === 2) {
      token = bearer[1];
    }

    const secret: any = process.env.JWT_SECRET;
    const validateToken: any = jwt.verify(token, secret);
    if (process.env.NODE_ENV !== "production")
      console.log("validateToken : ", validateToken);

    // jwt 복호화해서 나온 id 나 nickname 기준으로
    // db에서 확인해서 db 데이터를 넣어주느냐
    // 그대로 복호환 된 값을 넣어주느냐

    if (validateToken) {
      const result = await getUserFromId({ id: validateToken?.id });
      if (result.success === false) throw "db에 id가 없음";
      const {
        id,
        imageUri,
        email,
        role,
        uuid,
        createAt,
        isVerified,
        privateKey,
      }: IUser = result?.data?.user;
      let tokenBalance = await getBalance(privateKey);
      tokenBalance = ethers.utils.formatEther(tokenBalance);
      if (process.env.NODE_ENV !== "production") console.log(tokenBalance);
      req.user = {
        id,
        imageUri,
        email,
        role,
        uuid,
        createAt,
        isVerified,
        privateKey,
        tokenBalance,
      };
      next();
    } else {
      throw "token expires";
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({
      success: false,
      data: null,
      message: err,
    });
  }
};

const emailVerified = async (req: Request, res: any, next: NextFunction) => {
  const id = req.body.id as string;
  if (process.env.NODE_ENV !== "production") console.log(id);
  const result = await checkEmailVerifyFromId({ id });
  if (result.success) {
    next();
  } else {
    if (process.env.NODE_ENV !== "production") console.log(result.error);
    return res.status(500).json(result);
  }
};

const isNotEmailVerified = async (
  req: Request,
  res: any,
  next: NextFunction
) => {
  const id = req.body.id as string;
  if (process.env.NODE_ENV !== "production") console.log(id);
  const result = await checkEmailVerifyFromId({ id });
  if (result.success) {
    result.error = "이미 이메일 인증을 받았습니다.";
    console.log(result.error);
    return res.status(500).json(result).redirect("/emailVerify");
  } else {
    next();
  }
};

const uploadImage = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

export { loginRequired, emailVerified, isNotEmailVerified, uploadImage };
