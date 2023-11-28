"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SIOService {
    constructor(authService, usersService) {
        this.authService = authService;
        this.usersService = usersService;
    }
    verifyAccessToken(accessToken) {
        return this.authService.verifyAccessToken(accessToken);
    }
    refreshUserToken(refreshToken) {
        return this.authService.refresh(refreshToken);
    }
}
SIOService.INSTANCE_NAME = 'sioService';
exports.default = SIOService;
//# sourceMappingURL=sio.service.js.map