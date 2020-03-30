"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User(username, salt, password) {
        this.username = username;
        this.salt = salt;
        this.password = password;
    }
    return User;
}());
exports.default = User;
