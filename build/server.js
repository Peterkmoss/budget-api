"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var UsersController_1 = __importDefault(require("./controllers/UsersController"));
var app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/api', UsersController_1.default);
app.listen(8080, function () {
    console.log('Server running at port 8080');
});
