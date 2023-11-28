"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestHandler = void 0;
const axios_1 = require("axios");
const dro_1 = require("./dro");
const exceptions_1 = require("./exceptions");
const logger_1 = require("./logger");
function RequestHandler(event) {
    return async (req, res, next) => {
        try {
            const data = await event(req, res, next);
            res.send(dro_1.dro.response(data));
        }
        catch (err) {
            if (err instanceof exceptions_1.RestApiException) {
                return res.status(err.httpCode).send(dro_1.dro.error(err.message));
            }
            if (err instanceof Error) {
                logger_1.Logger.exception(err);
                return res.status(axios_1.HttpStatusCode.InternalServerError).send(dro_1.dro.error(err.message));
            }
            return res.status(axios_1.HttpStatusCode.InternalServerError).send(dro_1.dro.error('Unknown error'));
        }
    };
}
exports.RequestHandler = RequestHandler;
//# sourceMappingURL=request-handler.js.map