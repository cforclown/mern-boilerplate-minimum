"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerEvent = exports.socketioEventHandlerWrapper = void 0;
const utils_1 = require("../utils");
const socketioEventHandlerWrapper = (eventName, socket, handler, schema) => {
    if (schema) {
        return async (payload) => {
            try {
                if (!payload) {
                    socket.emit(eventName, utils_1.dro.error('Payload not found'));
                    return;
                }
                const { error } = schema.validate(payload.data);
                if (error) {
                    utils_1.Logger.error(error);
                    socket.emit(eventName, utils_1.dro.error(error.details.map(er => er.message).join(', ')));
                    return;
                }
                handler(socket, payload);
            }
            catch (err) {
                utils_1.Logger.exception(err);
                socket.emit(eventName, utils_1.dro.error(err.message ?? 'Unexpected error occured'));
            }
        };
    }
    return async () => {
        try {
            handler(socket);
        }
        catch (err) {
            utils_1.Logger.exception(err);
            socket.emit(eventName, utils_1.dro.error(err.message ?? 'Unexpected error occured'));
        }
    };
};
exports.socketioEventHandlerWrapper = socketioEventHandlerWrapper;
const registerEvent = (socket, eventName, handler, schema) => {
    socket.on(eventName, (0, exports.socketioEventHandlerWrapper)(eventName, socket, handler, schema));
};
exports.registerEvent = registerEvent;
//# sourceMappingURL=sio.utils.js.map