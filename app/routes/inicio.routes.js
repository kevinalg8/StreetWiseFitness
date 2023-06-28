import { Router } from "express"
import * as controllerProds from "../controllers/controller.productos.js"
import * as controllers from "../controllers/controller.usuarios.js"
import * as planControllers from "../controllers/controller.planes.js"
import {validateToken} from '../middlewares/middleware.js'

const inicio = Router();

inicio.get('/', (req, res)=>{res.render("inicio", {"rol":0})})
inicio.get('/productos',validateToken,controllerProds.getProductos)
inicio.get('/planes',validateToken,(req,res)=>{res.render("planes")})
inicio.get('/trenInferior',controllerProds.getProdinf)
inicio.get('/trenSuperior',controllerProds.getProdsup)
inicio.get('/plangeneral',controllerProds.getProdgen)
inicio.get('/recetasDeLaComunidad',validateToken,(req,res)=>{res.render("recipes")})
inicio.get('/CrearPlanes',(req,res)=>{res.render("createPlan")})
inicio.post('/CrearElPlan',planControllers.createPlanes)
inicio.get('/cerrarSesion',controllers.cerrarSesion)
inicio.get('/configuraciones',(req,res)=>{res.render("config")})

export default inicio;