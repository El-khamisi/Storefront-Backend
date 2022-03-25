"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderSection = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
var status;
(function (status) {
    status["active"] = "active";
    status["complete"] = "complete";
})(status || (status = {}));
class orderSection {
    async index() {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get orders. Error: ${err}`);
        }
    }
    async create(obj) {
        try {
            const sql = 'INSERT INTO orders (product_id, qnt_product, user_id, curr_status) VALUES($1, $2) RETURNING *';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn
                .query(sql, [obj.product_id, obj.qnt_product, obj.user_id, obj.curr_status]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Could not add new order. Error: ${err}`);
        }
    }
    async showUserOrders(userId) {
        try {
            const sql = 'SELECT * FROM orders WHERE user_id=($1)';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [userId]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not find orders for user ${userId}. Error: ${err}`);
        }
    }
}
exports.orderSection = orderSection;
