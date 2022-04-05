"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const authN_1 = __importDefault(require("../middleware/authN"));
const section = new order_1.orderSection();
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
const create = async (req, res) => {
    try {
        const order = {
            user_id: req.body.user_id,
            curr_status: req.body.curr_status,
        };
        const saved = await section.create(order);
        res.json(saved);
    }
    catch (err) {
        if (err instanceof Error)
            res.status(400).json({ e: err.message });
    }
};
const userOrder = async (req, res) => {
    try {
        const response = await section.showUserOrder(req.params.userID);
        res.json(response);
    }
    catch (err) {
        if (err instanceof Error)
            res.status(400).json({ e: err.message });
    }
};
const addProduct = async (_req, res) => {
    const productId = _req.body.productId;
    const orderId = _req.params.id;
    const quantity = parseInt(_req.body.quantity);
    try {
        const addedProduct = await section.addProduct(productId, orderId, quantity);
        res.json(addedProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const orderRoutes = (app) => {
    app.get('/orders', authN_1.default, index);
    app.post('/orders', authN_1.default, create);
    app.get('/orders/:userID', authN_1.default, userOrder);
    app.post('/orders/:id/products', authN_1.default, addProduct);
};
exports.default = orderRoutes;
