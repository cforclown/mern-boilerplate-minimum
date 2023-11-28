"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
class AuthController {
    constructor(authService) {
        this.authService = authService;
        this.login = this.login.bind(this);
        this.verify = this.verify.bind(this);
        this.register = this.register.bind(this);
        this.refresh = this.refresh.bind(this);
    }
    async login({ body }) {
        return this.authService.login(body);
    }
    async register({ body }) {
        return this.authService.register(body);
    }
    async verify({ user }) {
        return this.authService.verify(user);
    }
    async refresh({ body }) {
        return this.authService.refresh(body.refreshToken);
    }
}
exports.AuthController = AuthController;
AuthController.INSTANCE_NAME = 'authController';
//# sourceMappingURL=auth.controller.js.map