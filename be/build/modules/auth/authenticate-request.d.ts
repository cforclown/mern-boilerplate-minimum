import { NextFunction, Request, Response } from 'express';
import { Method } from 'axios';
export interface IExcludePath {
    path: string;
    method?: Method;
}
export declare function authenticateRequest(excludePaths: IExcludePath[]): (req: Request, res: Response, next: NextFunction) => any;
