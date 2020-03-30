"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_validation_1 = require("express-validation");
var UserRepository_1 = __importDefault(require("./UserRepository"));
var UserDTO_1 = __importDefault(require("../models/UserDTO"));
var loginValidation = {
    body: express_validation_1.Joi.object({
        username: express_validation_1.Joi.string().required(),
        password: express_validation_1.Joi.string().required()
    })
};
var router = express_1.default.Router();
router.post('/signup', express_validation_1.validate(loginValidation), function (req, res) {
    var repo = new UserRepository_1.default();
    var user = new UserDTO_1.default(req.body.username, req.body.password);
    repo.create(user); // Ignoring status code for now
    res.redirect('back');
});
exports.default = router;
