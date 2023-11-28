"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
function initSocketIO(server, sioController) {
    const io = new socket_io_1.Server(server, {
        cors: { origin: '*' }
    });
    io
        .use(sioController.authenticate)
        .on('connection', sioController.connection);
    return io;
}
exports.default = initSocketIO;
//# sourceMappingURL=index.js.map