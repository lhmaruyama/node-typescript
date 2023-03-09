"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const database_1 = require("../../../database");
const uuid_1 = require("uuid");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
class UserRepository {
    create(req, res) {
        const { name, email, password } = req.body;
        database_1.pool.getConnection((err, connection) => {
            (0, bcrypt_1.hash)(password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json(err);
                }
                connection.query('INSERT INTO users (user_id, name, email, password) VALUES (?,?,?,?)', [(0, uuid_1.v4)(), name, email, hash], (error, data, fields) => {
                    connection.release();
                    if (error) {
                        return res.status(400).json(error);
                    }
                    res.status(200).json({ message: "Usuario criado com sucesso" });
                });
            });
        });
    }
    login(req, res) {
        const { email, password } = req.body;
        database_1.pool.getConnection((err, connection) => {
            connection.query('SELECT * FROM users WHERE email = ?', [email], (error, data, fields) => {
                connection.release();
                if (error) {
                    return res.status(400).json({ error: "Erro na autenticação" });
                }
                (0, bcrypt_1.compare)(password, data[0].password, (err, result) => {
                    if (err) {
                        return res.status(400).json({ error: "Erro na autenticação" });
                    }
                    if (result) {
                        const token = (0, jsonwebtoken_1.sign)({
                            id: data[0].user_id,
                            email: data[0].email
                        }, process.env.SECRET, { expiresIn: "1d" });
                        console.log(token);
                        return res.status(200).json({ token: token, message: "Autenticado com sucesso" });
                    }
                });
            });
        });
    }
}
exports.UserRepository = UserRepository;
