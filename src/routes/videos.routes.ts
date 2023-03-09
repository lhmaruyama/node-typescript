import { Router } from "express";
import { auth } from "../middleware/auth";
import { VideoRepository } from "../modules/videos/repositories/VideoRepository";


const videosRoutes = Router()
const videoRepository = new VideoRepository()

videosRoutes.post("/create", auth, (req, res) => {
    videoRepository.create(req, res)

})

videosRoutes.get("/get/:user_id", auth, (req, res) => {
    videoRepository.getByUser(req, res)

})

videosRoutes.get("/search", auth, (req, res) => {
    videoRepository.search(req, res)

})


export { videosRoutes }