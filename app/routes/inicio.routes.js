import { Router } from "express"
import * as controller from "../controllers/controller.productos.js"
import * as controllers from "../controllers/controller.usuarios.js"
import * as planControllers from "../controllers/controller.planes.js"
import {validateToken} from '../middlewares/middleware.js'

const inicio = Router();

inicio.get('/', (req, res)=>{res.render("inicio", {"rol":0})})
inicio.get('/productos',validateToken,controller.getProductos)
inicio.get('/planes',validateToken,(req,res)=>{res.render("planes")})
inicio.get('/recetasDeLaComunidad',validateToken,(req,res)=>{res.render("recipes")})
inicio.get('/CrearPlanes',(req,res)=>{res.render("createPlan")})
inicio.post('/CrearElPlan',planControllers.createPlanes)
inicio.get('/admin',controllers.getUsuarios)
inicio.post('/disable-user',controllers.inhabilitar)
inicio.get('/cerrarSesion',controllers.cerrarSesion)

export default inicio;