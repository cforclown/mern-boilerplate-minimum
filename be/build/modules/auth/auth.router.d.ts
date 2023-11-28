import express from 'express';
import { AuthController } from './auth.controller';
export declare const AUTH_ROUTER_INSTANCE_NAME = "authRouter";
export declare const AUTH_BASE_API_PATH = "auth";
export declare function AuthRouter(authController: AuthController): express.Router;
