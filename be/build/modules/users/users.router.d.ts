import { Router } from 'express';
import { UsersController } from './users.controller';
export declare const USERS_ROUTER_INSTANCE_NAME = "usersRouter";
export declare const USERS_BASE_API_PATH = "users";
export declare function UsersRouter(usersController: UsersController): Router;
