"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const axios_1 = require("axios");
const utils_1 = require("../utils");
class SIOController {
    constructor(sioService) {
        this.sioService = sioService;
        this.authenticate = this.authenticate.bind(this);
        this.connection = this.connection.bind(this);
    }
    async authenticate(socket, next) {
        try {
            const { accessToken, refreshToken } = socket.handshake.auth;
            if (!accessToken) {
                next(new Error('Access token not found'));
            }
            let userContext;
            try {
                const user = await this.sioService.verifyAccessToken(accessToken);
                userContext = { user };
            }
            catch (err) {
                if (err instanceof jsonwebtoken_1.TokenExpiredError) {
                    const newToken = await this.sioService.refreshUserToken(refreshToken);
                    socket.emit('new-access-token', utils_1.dro.response(newToken));
                    userContext = {
                        user: newToken.user
                    };
                }
            }
            if (!userContext) {
                throw new Error('Unauthorized');
            }
            const extsocket = socket;
            extsocket.userContext = userContext;
            next();
        }
        catch (err) {
            if (err instanceof Error) {
                utils_1.Logger.danger(err.message);
                next(new utils_1.RestApiException(err.message, axios_1.HttpStatusCode.Unauthorized));
                socket.disconnect(true);
            }
        }
    }
    async connection(socket) {
        utils_1.Logger.success('NEW CONNECTION: ' + socket.id);
        socket.use((packet, next) => {
            try {
                utils_1.Logger.info(packet[0]);
            }
            catch (err) {
                utils_1.Logger.error(err.message);
            }
            finally {
                next();
            }
        });
    }
}
SIOController.INSTANCE_NAME = 'sioController';
exports.default = SIOController;
//# sourceMappingURL=sio.controller.js.map