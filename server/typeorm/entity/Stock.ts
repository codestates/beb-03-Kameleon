import { IsEmail, IsEnum, Length } from "class-validator";
import { Entity, Column, OneToMany } from "typeorm";
import { Model } from "./Models/Model";

@Entity()
export class Stock extends Model {
  @Column({ unique: true })
  stockCode!: string;
  @Column({ unique: true })
  name!: string;
  @Column()
  price!: number;
}
