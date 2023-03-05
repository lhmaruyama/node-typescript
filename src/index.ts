import express from "express";

const app = express()
app.use(express.json())

import { calc } from "./suport"

const a = 3
const b = 2
const c = calc(a,b)

console.log(c);
app.listen(4000,()=>{console.log("servidor rodando")})
