import { ICreateUserPayload, IUpdateUserPayload, IUser } from './users.types';
import { ILoginPayload } from '../auth';
export declare class UsersDao {
    static readonly INSTANCE_NAME = "usersDao";
    private readonly model;
    constructor();
    authenticate({ username, password }: ILoginPayload): Promise<IUser | null>;
    get(userId: string): Promise<IUser | null>;
    getByUsername(username: string): Promise<IUser | null>;
    getByEmail(email: string): Promise<IUser | null>;
    getAll(): Promise<IUser[]>;
    create(payload: ICreateUserPayload): Promise<IUser>;
    update(payload: IUpdateUserPayload & {
        id: string;
        password?: string;
    }): Promise<IUser>;
    delete(userId: string): Promise<string>;
}
