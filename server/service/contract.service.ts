import { validate } from "class-validator";
import {
  ILoginUser,
  IReadUser,
  IUser,
  returnUser,
} from "../types/service/InterfaceUser";
import { PoolTotalSupply } from "../typeorm/entity/PoolTotalSupply";
import bcrypt from "bcrypt";
import { returnApi } from "../types/service/Model/InterfaceReturnApiModel";

const recordPoolTotalSupply = async ({ data }: { data: any }): Promise<any> => {
  const { id, email, password, emailToken, isVerified, privateKey, imageUri } =
    data;
  try {
    const user = PoolTotalSupply.create({});
    return true;
  } catch (err) {
    return false;
  }
};

export { recordPoolTotalSupply };
