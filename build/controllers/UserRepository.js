"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = __importDefault(require("crypto"));
var User_1 = __importDefault(require("../models/User"));
var database_1 = __importDefault(require("../config/database"));
var UserRepository = /** @class */ (function () {
    function UserRepository() {
    }
    UserRepository.prototype.create = function (user) {
        var salt = crypto_1.default.randomBytes(16).toString('hex');
        var entity = new User_1.default(user.username, salt, crypto_1.default.createHmac('sha512', salt).update(user.password).digest('hex'));
        database_1.default.connect(function (err) {
            if (err) {
                return 500;
            }
        });
        database_1.default.query('insert into users set ?', entity, function (err, res) {
            if (err)
                return 500;
            console.log(res);
        });
        database_1.default.end();
        return 201;
    };
    UserRepository.prototype.get = function (username) {
        throw new Error("Method not implemented.");
    };
    return UserRepository;
}());
exports.default = UserRepository;
