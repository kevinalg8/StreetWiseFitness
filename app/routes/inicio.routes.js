import { Router } from "express"

const inicio = Router();

inicio.get('/', (req, res)=>{res.render("login")})
inicio.get('/Productos', (req, res)=>{res.render("productos")})


export default inicio;