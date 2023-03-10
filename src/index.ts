import express from "express";
import { config } from "dotenv"
import { userRoutes } from "./routes/user.routes";
import { videosRoutes } from "./routes/videos.routes";

const app = express()
app.use(express.json())

config()

app.use("/user", userRoutes)
app.use("/videos", videosRoutes)

app.listen(4000, () => { console.log("Servidor Rodando") })
