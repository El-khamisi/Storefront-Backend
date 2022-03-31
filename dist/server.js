"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
//Routes
const products_1 = __importDefault(require("./handlers/products"));
const user_1 = __importDefault(require("./handlers/user"));
const orders_1 = __importDefault(require("./handlers/orders"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5050;
app.use(body_parser_1.default.json());
(0, products_1.default)(app);
(0, user_1.default)(app);
(0, orders_1.default)(app);
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(port, function () {
    console.log(`starting app on port: ${port}`);
});
exports.default = app;
