import { Router } from "express"
import * as controller from "../controllers/controller.productos.js"
import {validateToken} from '../middlewares/middleware.js'

const inicio = Router();

//inicio.get('/', (req, res)=>{res.render("login")})
// inicio.get('/login', controllers.loginUsuario)
inicio.get('/inicio', (req, res)=>{res.render("inicio")})
inicio.get('/productos',validateToken,controller.getProductos)

export default inicio;