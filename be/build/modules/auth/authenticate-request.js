"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateRequest = void 0;
const axios_1 = require("axios");
const jsonwebtoken_1 = require("jsonwebtoken");
const utils_1 = require("../../utils");
function authenticateRequest(excludePaths) {
    return (req, res, next) => {
        try {
            for (const excludePath of excludePaths) {
                if (req.originalUrl.includes(excludePath.path) && (!excludePath.method || (excludePath.method === req.method))) {
                    return next();
                }
            }
            if (!req.headers.authorization) {
                return res.status(axios_1.HttpStatusCode.Unauthorized).send(utils_1.dro.error('Unauthorized'));
            }
            const [, token] = req.headers.authorization.split(' ');
            const user = (0, jsonwebtoken_1.verify)(token, utils_1.Environment.getAccessTokenSecret());
            if (!user) {
                return res.status(axios_1.HttpStatusCode.Unauthorized).send(utils_1.dro.error('Invalid access token'));
            }
            req.user = user;
            next();
        }
        catch (err) {
            if (err instanceof jsonwebtoken_1.TokenExpiredError || err instanceof jsonwebtoken_1.JsonWebTokenError || err instanceof jsonwebtoken_1.NotBeforeError) {
                utils_1.Logger.error(err.message);
                return res.status(axios_1.HttpStatusCode.Unauthorized).send(utils_1.dro.error(err.message));
            }
            if (err instanceof Error) {
                utils_1.Logger.error(err.message, utils_1.ELogLevel.ERROR);
                return res.status(axios_1.HttpStatusCode.InternalServerError).send(utils_1.dro.error(err.message));
            }
        }
    };
}
exports.authenticateRequest = authenticateRequest;
//# sourceMappingURL=authenticate-request.js.map