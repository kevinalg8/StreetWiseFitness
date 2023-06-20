import { Router } from "express"
import * as controller from "../controllers/controller.productos.js"
import {validateToken} from '../middlewares/middleware.js'

const inicio = Router();

//inicio.get('/', (req, res)=>{res.render("login")})
//inicio.post('/auth', controller.loginUsuario)
inicio.get('/inicio', (req, res)=>{res.render("inicio")})
inicio.get('/productos',controller.getProductos)
inicio.get('/planes',(req, res)=>{res.render("planes")})

export default inicio;