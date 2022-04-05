"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const authN_1 = __importDefault(require("../middleware/authN"));
dotenv_1.default.config();
const TOKEN_SECRET = process.env.TOKEN_SECRET;
const section = new user_1.userSection();
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
        const nUser = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: req.body.password,
        };
        const saved = await section.create(nUser);
        saved.password = '';
        const token = jsonwebtoken_1.default.sign({ user: saved }, TOKEN_SECRET);
        res.json({ token });
    }
    catch (err) {
        if (err instanceof Error)
            res.status(400).json({ e: err.message });
    }
};
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const response = await section.authenticate(username, password);
        const token = jsonwebtoken_1.default.sign({ user: response }, TOKEN_SECRET);
        res.json({ token });
    }
    catch (err) {
        if (err instanceof Error)
            res.status(400).json({ e: err.message });
    }
};
const userRoutes = (app) => {
    app.get('/users', authN_1.default, index);
    app.get('/user/:id', authN_1.default, show);
    app.post('/signup', create);
    app.post('/login', login);
};
exports.default = userRoutes;
