"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const user_routes_1 = require("./routes/user.routes");
const videos_routes_1 = require("./routes/videos.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, dotenv_1.config)();
app.use("/user", user_routes_1.userRoutes);
app.use("/videos", videos_routes_1.videosRoutes);
app.listen(4000, () => { console.log("Servidor Rodando"); });
