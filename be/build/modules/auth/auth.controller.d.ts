import express from 'express';
import { AuthService, IUserContext } from '.';
export declare class AuthController {
    static readonly INSTANCE_NAME = "authController";
    private readonly authService;
    constructor(authService: AuthService);
    login({ body }: express.Request): Promise<IUserContext>;
    register({ body }: express.Request): Promise<IUserContext>;
    verify({ user }: express.Request): Promise<IUserContext>;
    refresh({ body }: express.Request): Promise<IUserContext>;
}
