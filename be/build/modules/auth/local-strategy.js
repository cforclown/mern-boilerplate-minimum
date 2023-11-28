"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitLocalStrategy = void 0;
const passport_local_1 = require("passport-local");
function InitLocalStrategy(passport, authService) {
    passport.use(new passport_local_1.Strategy(async (username, password, done) => {
        try {
            const user = await authService.authenticate({ username, password });
            if (!user) {
                return done(null, false, { message: 'User not found' });
            }
            return done(null, user);
        }
        catch (error) {
            return done(error);
        }
    }));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (userId, done) => {
        try {
            const user = await authService.getUserById(userId);
            return done(null, user);
        }
        catch (error) {
            return done(error);
        }
    });
}
exports.InitLocalStrategy = InitLocalStrategy;
//# sourceMappingURL=local-strategy.js.map