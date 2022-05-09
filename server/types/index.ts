import { Timestamp } from 'typeorm';
import { User } from '../typeorm/entity/User';
export interface IUser {
    id?: string,
    privateKey?: string,
    imageUri?: string,
    email?: string,
    role?: string,
    uuid?: string,
    createAt?: Timestamp,
    isVerified?: boolean,
    tokenBalance?: string,
}
// 글로벌 선언
declare global {
    namespace Express {
        interface Request {
            user: IUser,
            post: {
                postUri: Array<string>
            },
            profile: {
                imageUri: string,
            },
            file: {
                buffer: string,
            }
        }
    }
}