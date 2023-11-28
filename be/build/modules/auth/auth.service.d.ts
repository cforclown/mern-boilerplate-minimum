import { ILoginPayload, IRegisterUserPayload, IUserContext } from '.';
import { IUser, UsersService } from '..';
export declare class AuthService {
    static readonly INSTANCE_NAME = "authService";
    private readonly usersService;
    constructor(usersService: UsersService);
    getUserById(userId: string): Promise<IUser>;
    authenticate(payload: ILoginPayload): Promise<IUser | null>;
    login(payload: ILoginPayload): Promise<IUserContext>;
    verify(user?: IUser): Promise<IUserContext>;
    register(payload: IRegisterUserPayload): Promise<IUserContext>;
    refresh(refreshToken: string): Promise<IUserContext>;
    verifyAccessToken(accessToken: string): Promise<IUser>;
    generateAccessToken(user: IUser): IUserContext;
}
