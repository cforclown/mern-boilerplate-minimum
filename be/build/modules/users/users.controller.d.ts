import { Request } from 'express';
import { UsersService } from './users.service';
import { IUser } from './users.types';
export declare class UsersController {
    static readonly INSTANCE_NAME = "usersController";
    private readonly usersService;
    constructor(usersService: UsersService);
    get({ params }: Request): Promise<IUser>;
    getAll(): Promise<IUser[]>;
    update({ user, body }: Request): Promise<IUser>;
    changePassword({ user, body }: Request): Promise<IUser>;
    delete({ params }: Request): Promise<string>;
}
