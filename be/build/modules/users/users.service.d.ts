import { IChangePasswordPayload, ICreateUserPayload, IUpdateUserPayload, IUser, UsersDao } from '.';
import { ILoginPayload } from '../auth';
export declare class UsersService {
    static readonly INSTANCE_NAME = "usersService";
    private readonly usersDao;
    constructor(usersDao: UsersDao);
    authenticate({ username, password }: ILoginPayload): Promise<IUser | null>;
    get(userId: string): Promise<IUser | null>;
    getAll(): Promise<IUser[]>;
    create(payload: ICreateUserPayload): Promise<IUser>;
    update(userId: string, payload: IUpdateUserPayload): Promise<IUser>;
    changePassword(userId: string, payload: IChangePasswordPayload): Promise<IUser>;
    delete(userId: string): Promise<string>;
}
