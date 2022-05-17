import { validate } from "class-validator";
import {
  ILoginUser,
  IReadUser,
  IUser,
  returnUser,
} from "../types/service/InterfaceUser";
import { PoolTotalSupply } from "../typeorm/entity/PoolLiquidity";
import bcrypt from "bcrypt";
import { returnApi } from "../types/service/Model/InterfaceReturnApiModel";

const recordPoolTotalSupply = async ({ data }: { data: any }): Promise<any> => {
  const {} = data;
  try {
    const poolTotalSupply = PoolTotalSupply.create({});
    return true;
  } catch (err) {
    return false;
  }
};

export { recordPoolTotalSupply };
