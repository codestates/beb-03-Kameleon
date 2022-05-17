import { IsEmail, IsEnum, Length } from "class-validator";
import { Entity, Column, OneToMany } from "typeorm";
import { Model } from "./Models/Model";

@Entity()
export class PoolLiquidity extends Model {
  @Column({ unique: true })
  name!: string;
  @Column({ unique: true })
  pool!: string;
}
