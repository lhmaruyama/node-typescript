import express from "express";
import {pool} from "./database"
import { v4 as uuid4 } from "uuid"

const app = express()
app.use(express.json())

import { calc } from "./suport"

const a = 1
const b = 1
const c = calc(a,b)
console.log(c);

app.post("/user", (req: any, res: any) => {
    const { name, email, password } = req.body
    pool.getConnection((err: any, connection: any) => {
        connection.query(
            'INSERT INTO users (user_id, name, email, password) VALUES (?,?,?,?)',
            [uuid4, name, email, password],
            (error: any, result: any, fields: any) => {
                if (error) {
                    return res.status(400).json(error)
                }
                res.status(200).json({ success: true })

            }

        )
    })
})


app.listen(4000,()=>{console.log("Servidor Rodando")})
