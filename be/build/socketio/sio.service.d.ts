import { AuthService, IUser, IUserContext, UsersService } from '../modules';
declare class SIOService {
    static readonly INSTANCE_NAME = "sioService";
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
    verifyAccessToken(accessToken: string): Promise<IUser>;
    refreshUserToken(refreshToken: string): Promise<IUserContext>;
}
export default SIOService;
