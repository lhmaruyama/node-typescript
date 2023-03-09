import { pool } from "../../../database"
import { v4 as uuid4 } from "uuid"
import { hash, compare } from "bcrypt"
import { sign } from "jsonwebtoken"
import { Request, Response } from "express"

class VideoRepository {
    create(req: Request, res: Response) {
        const { title, description, user_id } = req.body

        pool.getConnection((err: any, connection: any) => {

            connection.query(
                'INSERT INTO videos (video_id, user_id, title, description) VALUES (?,?,?,?)',
                [uuid4(), user_id, title, description],
                (error: any, data: any, fields: any) => {
                    connection.release()
                    if (error) {
                        return res.status(400).json(error)
                    }
                    res.status(200).json({ message: "Video criado com sucesso" })
                }
            )

        })
    }

    getByUser(req: Request, res: Response) {
        const { user_id } = req.params

        pool.getConnection((err: any, connection: any) => {

            connection.query(
                'SELECT * FROM videos WHERE user_id = ?',
                [user_id],
                (error: any, data: any, fields: any) => {
                    connection.release()
                    if (error) {
                        return res.status(400).json({ error: "Erro ao buscar videos" })
                    }

                    res.status(200).json({ message: "Video buscados com sucesso", videos: data })
                }
            )

        })
    }

    search(req: Request, res: Response) {
        const { search } = req.query

        pool.getConnection((err: any, connection: any) => {

            connection.query(
                'SELECT * FROM videos WHERE title LIKE ?',
                [`%${search}%`],
                (error: any, data: any, fields: any) => {
                    connection.release()
                    if (error) {
                        return res.status(400).json({ error: "Erro ao buscar videos" })
                    }

                    res.status(200).json({ message: "Video buscados com sucesso", videos: data })
                }
            )

        })
    }

}

export { VideoRepository }