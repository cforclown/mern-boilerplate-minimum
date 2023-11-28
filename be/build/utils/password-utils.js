"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = exports.hashPassword = exports.generateId = void 0;
const crypto_js_1 = require("crypto-js");
const nanoid_1 = require("nanoid");
const environment_1 = require("./environment");
const generateId = function () {
    return (0, nanoid_1.customAlphabet)('0123456789abcdefghijklmnopqrstuvwxyz', 16)();
};
exports.generateId = generateId;
const hashPassword = async function (password) {
    return (0, crypto_js_1.SHA512)(password).toString(crypto_js_1.enc.Hex);
};
exports.hashPassword = hashPassword;
function encrypt(data) {
    return crypto_js_1.AES.encrypt(data, environment_1.Environment.getEncryptionKey()).toString();
}
exports.encrypt = encrypt;
function decrypt(encrypted) {
    return crypto_js_1.AES.decrypt(encrypted, environment_1.Environment.getEncryptionKey()).toString(crypto_js_1.enc.Utf8);
}
exports.decrypt = decrypt;
//# sourceMappingURL=password-utils.js.map