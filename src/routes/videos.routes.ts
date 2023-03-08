import { Router } from "express";
import { VideoRepository } from "../modules/videos/repositories/VideoRepository";


const videosRoutes = Router()
const videoRepository = new VideoRepository()

videosRoutes.post("/create", (req, res) => {
    videoRepository.create(req, res)

})

videosRoutes.get("/get", (req, res) => {
    videoRepository.getByUser(req, res)

})


export { videosRoutes }