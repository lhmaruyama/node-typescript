import { Router } from "express";
import { VideoRepository } from "../modules/videos/repositories/VideoRepository";


const videosRoutes = Router()
const videoRepository = new VideoRepository()

videosRoutes.post("/create", (req, res) => {
    videoRepository.create(req, res)

})

videosRoutes.get("/get/:user_id", (req, res) => {
    videoRepository.getByUser(req, res)

})

videosRoutes.get("/search", (req, res) => {
    videoRepository.search(req, res)

})


export { videosRoutes }