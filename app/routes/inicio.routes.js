import { Router } from "express"
import * as controllers from "../controllers/controller.productos.js"

const inicio = Router();

inicio.get('/', (req, res)=>{res.render("login")})
inicio.get('/login', controllers.loginUsuario)
inicio.get('/inicio', (req, res)=>{res.render("inicio")})
inicio.get('/productos', controllers.getProductos)

export default inicio;