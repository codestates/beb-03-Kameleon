import { Timestamp } from 'typeorm';
import { User } from '../../typeorm/entity/User';
import { role } from "../enum";
import { returnApi } from "./Model/InterfaceReturnApiModel"
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

interface IUser {
    imageUri?: string | undefined | null,
    id?: string,
    email?: string,
    password?: string,
    emailToken?: string | null,
    isVerified?: boolean,
    privateKey?: string,
    role?: string,
    uuid?: string,
    createAt?: Timestamp,
    tokenBalance?: string,
}

// interface ICreateUser extends IUser {
//     id: string,
//     nickname: string,
//     email: string,
//     password: string,
//     emailToken?: string,
//     isVerified?: boolean,
// }

interface IReadUser {
    id: string
}

interface ILoginUser {
    id: string,
    password: string
}
interface returnUser extends returnApi {
    user?: any,
}


export type { IReadUser, ILoginUser, returnUser, IUser }