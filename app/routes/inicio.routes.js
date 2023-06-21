import { Router } from "express"
import * as controller from "../controllers/controller.productos.js"
import {validateToken} from '../middlewares/middleware.js'

const inicio = Router();

inicio.get('/inicio', (req, res)=>{res.render("inicio")})
inicio.get('/productos',validateToken,controller.getProductos)
inicio.get('/planes',validateToken,(req,res)=>{res.render("planes")})

export default inicio;