"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const authN_1 = __importDefault(require("../middleware/authN"));
const section = new product_1.productSection();
const index = async (_req, res) => {
    const response = await section.index();
    res.json(response);
};
const show = async (req, res) => {
    const response = await section.show(req.body.id);
    res.json(response);
};
const create = async (req, res) => {
    try {
        const product = {
            name: req.body.name,
            price: req.body.price,
        };
        const saved = await section.create(product);
        res.json(saved);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const productRoutes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', authN_1.default, create);
};
exports.default = productRoutes;
