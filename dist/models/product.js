"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSection = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
class productSection {
    async index() {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get products. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM products WHERE id=($1)';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`);
        }
    }
    async create(obj) {
        try {
            const sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn
                .query(sql, [obj.name, obj.price]);
            const book = result.rows[0];
            conn.release();
            return book;
        }
        catch (err) {
            throw new Error(`Could not add new product ${obj.name}. Error: ${err}`);
        }
    }
}
exports.productSection = productSection;
