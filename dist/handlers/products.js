"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const authN_1 = __importDefault(require("../middleware/authN"));
const section = new product_1.productSection();
const index = async (_req, res) => {
    try {
        const response = await section.index();
        res.json(response);
    }
    catch (err) {
        if (err instanceof Error)
            res.status(500).json({ e: err.message });
    }
};
const show = async (req, res) => {
    try {
        const response = await section.show(req.params.id);
        res.json(response);
    }
    catch (err) {
        if (err instanceof Error)
            res.status(500).json({ e: err.message });
    }
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
        if (err instanceof Error)
            res.status(400).json({ e: err.message });
    }
};
const productRoutes = (app) => {
    app.get('/products', index);
    app.get('/product/:id', show);
    app.post('/products', authN_1.default, create);
};
exports.default = productRoutes;
