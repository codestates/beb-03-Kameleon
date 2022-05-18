import { IsEmail, IsEnum, Length } from "class-validator";
import { Entity, Column, OneToMany } from "typeorm";
import { Model } from "./Models/Model";

@Entity({ name: "pool_liquidity" })
export class PoolLiquidity extends Model {
  @Column()
  address!: string;
  @Column()
  poolSize!: number;
}
