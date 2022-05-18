import { validate } from "class-validator";
import {
  ILoginUser,
  IReadUser,
  IUser,
  returnUser,
} from "../types/service/InterfaceUser";
import { PoolLiquidity } from "../typeorm/entity/PoolLiquidity";
import { getConnection } from "typeorm";
import { v4 as uuid } from "uuid";
import { returnApi } from "../types/service/Model/InterfaceReturnApiModel";

interface insertType {
  address: string;
  poolSize: number;
}

const recordPoolLiquidity = async (data: insertType): Promise<boolean> => {
  try {
    const { address, poolSize } = data;
    console.log(address, poolSize);
    const poolLiquidity = PoolLiquidity.create({
      poolSize,
      address,
    });
    await poolLiquidity.save();
    return true;
  } catch (err) {
    return false;
  }
};
const recordBulkPoolLiquidity = async (
  data: Array<insertType>
): Promise<boolean> => {
  try {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(PoolLiquidity)
      .values([...data.map((v) => ({ ...v, uuid: uuid() }))])
      .execute();
    return true;
  } catch (err) {
    return false;
  }
};

const getPoolLiquidity = async ({ exchangeAddress }): Promise<returnApi> => {
  try {
    const data = await getConnection()
      .getRepository(PoolLiquidity)
      .createQueryBuilder("poolLiquidity")
      .where("address = :address", { address: exchangeAddress })
      .getMany();

    console.log(data);
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.log(error);
    return {
      success: true,
      data: null,
    };
  }
};

export { recordPoolLiquidity, recordBulkPoolLiquidity, getPoolLiquidity };
