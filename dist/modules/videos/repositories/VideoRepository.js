"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoRepository = void 0;
const database_1 = require("../../../database");
const uuid_1 = require("uuid");
class VideoRepository {
    create(req, res) {
        const { title, description, user_id } = req.body;
        database_1.pool.getConnection((err, connection) => {
            connection.query('INSERT INTO videos (video_id, user_id, title, description) VALUES (?,?,?,?)', [(0, uuid_1.v4)(), user_id, title, description], (error, data, fields) => {
                connection.release();
                if (error) {
                    return res.status(400).json(error);
                }
                res.status(200).json({ message: "Video criado com sucesso" });
            });
        });
    }
    getByUser(req, res) {
        const { user_id } = req.params;
        database_1.pool.getConnection((err, connection) => {
            connection.query('SELECT * FROM videos WHERE user_id = ?', [user_id], (error, data, fields) => {
                connection.release();
                if (error) {
                    return res.status(400).json({ error: "Erro ao buscar videos" });
                }
                res.status(200).json({ message: "Video buscados com sucesso", videos: data });
            });
        });
    }
    search(req, res) {
        const { search } = req.query;
        database_1.pool.getConnection((err, connection) => {
            connection.query('SELECT * FROM videos WHERE title LIKE ?', [`%${search}%`], (error, data, fields) => {
                connection.release();
                if (error) {
                    return res.status(400).json({ error: "Erro ao buscar videos" });
                }
                res.status(200).json({ message: "Video buscados com sucesso", videos: data });
            });
        });
    }
}
exports.VideoRepository = VideoRepository;
