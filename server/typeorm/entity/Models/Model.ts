import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, BeforeInsert } from "typeorm";
import { v4 as uuid } from 'uuid'

export abstract class Model extends BaseEntity {
    @PrimaryGeneratedColumn()
    index: number;

    @Column({ unique: true, type: 'uuid' })
    uuid!: string

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    @BeforeInsert()
    createUuid() {
        this.uuid = uuid()
    }

    constructor(model?: Partial<any>) {
        super()
        Object.assign(this, model)
    }


    // 값 반환할때 막는법
    // toJSON() {
    //     return { ...this, index: undefined }
    // }
}