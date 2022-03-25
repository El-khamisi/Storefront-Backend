"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSection = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
const pepper = process.env.PEPPER;
const saltrounds = process.env.SALT_ROUNDS;
class userSection {
    async index() {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get users. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`);
        }
    }
    async create(obj) {
        try {
            const sql = 'INSERT INTO products (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const hashed = bcrypt_1.default.hashSync(obj.password + pepper, parseInt(saltrounds));
            const result = await conn
                .query(sql, [obj.firstName, obj.lastName, hashed]);
            const book = result.rows[0];
            conn.release();
            return book;
        }
        catch (err) {
            throw new Error(`Could not add new user ${obj.firstName} ${obj.lastName}. Error: ${err}`);
        }
    }
    async authenticate(username, password) {
        const sql = 'SELECT password FROM users WHERE username=($1)';
        // @ts-ignore
        const conn = await database_1.default.connect();
        const result = await conn.query(sql, [username]);
        console.log(password + pepper);
        if (result.rows.length) {
            const user = result.rows[0];
            console.log(user);
            if (bcrypt_1.default.compareSync(password + pepper, user.password)) {
                return user;
            }
        }
        return null;
    }
}
exports.userSection = userSection;