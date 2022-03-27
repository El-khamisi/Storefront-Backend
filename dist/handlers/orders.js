"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const authN_1 = __importDefault(require("../middleware/authN"));
const section = new order_1.orderSection();
const index = async (_req, res) => {
    const response = await section.index();
    res.json(response);
};
const create = async (req, res) => {
    try {
        const order = {
            product_id: parseInt(req.body.product_id),
            qnt_product: parseInt(req.body.qnt_product),
            user_id: parseInt(req.body.user_id),
            curr_status: req.body.curr_status
        };
        const saved = await section.create(order);
        res.json(saved);
    }
    catch (err) {
        if (err instanceof Error)
            res.status(400).json({ e: err.message });
    }
};
const getByUser = async (req, res) => {
    try {
        const response = await section.showUserOrders(req.params.userID);
        res.json(response);
    }
    catch (err) {
        if (err instanceof Error)
            res.status(400).json({ e: err.message });
    }
};
const orderRoutes = (app) => {
    app.get('/orders', index);
    app.post('/orders', authN_1.default, create);
    app.get('/orders/:userID', authN_1.default, getByUser);
};
exports.default = orderRoutes;
