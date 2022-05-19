import { IsEmail, IsEnum, Length } from "class-validator";
import { Entity, Column, OneToMany } from "typeorm";
import { Model } from "./Models/Model";

@Entity()
export class PoolLiquidity extends Model {
  @Column()
  address!: string;
  @Column({ type: "bigint" })
  poolSize!: number;
}
