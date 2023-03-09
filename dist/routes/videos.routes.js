"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRoutes = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const VideoRepository_1 = require("../modules/videos/repositories/VideoRepository");
const videosRoutes = (0, express_1.Router)();
exports.videosRoutes = videosRoutes;
const videoRepository = new VideoRepository_1.VideoRepository();
videosRoutes.post("/create", auth_1.auth, (req, res) => {
    videoRepository.create(req, res);
});
videosRoutes.get("/get/:user_id", auth_1.auth, (req, res) => {
    videoRepository.getByUser(req, res);
});
videosRoutes.get("/search", auth_1.auth, (req, res) => {
    videoRepository.search(req, res);
});
