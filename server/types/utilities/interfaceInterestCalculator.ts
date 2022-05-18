import { returnType } from "../common";

export interface IPoolLiquidity {
  exchangeAddress: string;
  poolLiquidity: number;
  totalSupply: string;
}

export interface IPoolLiquidity_ReturnType extends returnType {
  data: Array<IPoolLiquidity>;
}
