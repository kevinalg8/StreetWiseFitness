import { Router } from "express"
import * as controller from "../controllers/controller.productos.js"
import * as controllers from "../controllers/controller.usuarios.js"
import {validateToken} from '../middlewares/middleware.js'

const inicio = Router();

inicio.get('/', (req, res)=>{ res.render("inicio"); })
inicio.get('/productos',validateToken,controller.getProductos)
inicio.get('/planes',validateToken,(req,res)=>{res.render("planes")})
inicio.get('/recetasDeLaComunidad',(req,res)=>{res.render("recipes")})
inicio.get('/admin',controllers.getUsuarios)
inicio.post('/disable-user',controllers.inhabilitar)

export default inicio;