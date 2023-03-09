import { pool } from "../../../database"
import { v4 as uuid4 } from "uuid"
import { hash, compare } from "bcrypt"
import { sign } from "jsonwebtoken"
import { Request, Response } from "express"

class UserRepository {
    create(req: Request, res: Response) {
        const { name, email, password } = req.body

        pool.getConnection((err: any, connection: any) => {
            hash(password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json(err)
                }
                connection.query(
                    'INSERT INTO users (user_id, name, email, password) VALUES (?,?,?,?)',
                    [uuid4(), name, email, hash],
                    (error: any, data: any, fields: any) => {
                        connection.release()
                        if (error) {
                            return res.status(400).json(error)
                        }
                        res.status(200).json({ message: "Usuario criado com sucesso" })
                    }
                )
            })
        })
    }

    login(req: Request, res: Response){
        const { email, password } = req.body

        pool.getConnection((err: any, connection: any) => {
    
            connection.query(
                'SELECT * FROM users WHERE email = ?',
                [email],
                (error: any, data: any, fields: any) => {
                    connection.release()
                    if (error) {
                        return res.status(400).json({ error: "Erro na autenticação" })
                    }
                    compare(password, data[0].password, (err, result) => {
                        if (err) {
                            return res.status(400).json({ error: "Erro na autenticação" })
                        }
    
                        if (result) {
                            const token = sign({
                                id: data[0].user_id,
                                email: data[0].email
                            }, process.env.SECRET as string, { expiresIn: "1d" })
                            console.log(token)
                            return res.status(200).json({ token: token, message: "Autenticado com sucesso" })
                        }
                    })
    
                }
            )
    
        })
    }
}

export { UserRepository }