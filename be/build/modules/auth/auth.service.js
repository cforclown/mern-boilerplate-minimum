"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const axios_1 = require("axios");
const utils_1 = require("../../utils");
class AuthService {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async getUserById(userId) {
        const user = await this.usersService.get(userId);
        if (!user) {
            throw new utils_1.RestApiException('User not found');
        }
        return user;
    }
    async authenticate(payload) {
        return this.usersService.authenticate(payload);
    }
    async login(payload) {
        const user = await this.usersService.authenticate(payload);
        if (!user) {
            throw new utils_1.RestApiException('Incorrect username or password', axios_1.HttpStatusCode.NotFound);
        }
        return this.generateAccessToken(user);
    }
    async verify(user) {
        if (!user) {
            throw new Error('No user object in request');
        }
        return this.generateAccessToken(user);
    }
    async register(payload) {
        if (payload.password !== payload.confirmPassword) {
            throw new utils_1.RestApiException('Confirm password is not match');
        }
        const user = await this.usersService.create(payload);
        return this.generateAccessToken(user);
    }
    async refresh(refreshToken) {
        try {
            const tokenData = (0, jsonwebtoken_1.verify)(refreshToken, utils_1.Environment.getRefreshTokenSecret());
            const user = await this.usersService.get(tokenData.id);
            if (!user) {
                throw new utils_1.RestApiException('Refresh token is not valid', axios_1.HttpStatusCode.Unauthorized);
            }
            return this.generateAccessToken(user);
        }
        catch (err) {
            throw new utils_1.RestApiException('Refresh token is expired', axios_1.HttpStatusCode.Unauthorized);
        }
    }
    async verifyAccessToken(accessToken) {
        try {
            const tokenData = (0, jsonwebtoken_1.verify)(accessToken, utils_1.Environment.getAccessTokenSecret());
            const user = await this.usersService.get(tokenData.id);
            if (!user) {
                throw new utils_1.RestApiException('Refresh token is not valid', axios_1.HttpStatusCode.Unauthorized);
            }
            return user;
        }
        catch (err) {
            throw new utils_1.RestApiException('Refresh token is expired', axios_1.HttpStatusCode.Unauthorized);
        }
    }
    generateAccessToken(user) {
        const expiresIn = utils_1.Environment.getAccessTokenExpIn();
        const accessToken = (0, jsonwebtoken_1.sign)({ ...user.toJSON() }, utils_1.Environment.getAccessTokenSecret(), { expiresIn });
        const refreshToken = (0, jsonwebtoken_1.sign)({ ...user.toJSON() }, utils_1.Environment.getRefreshTokenSecret(), { expiresIn: utils_1.Environment.getRefreshTokenExpIn() });
        return {
            user,
            accessToken,
            refreshToken,
            expiresIn
        };
    }
}
exports.AuthService = AuthService;
AuthService.INSTANCE_NAME = 'authService';
//# sourceMappingURL=auth.service.js.map