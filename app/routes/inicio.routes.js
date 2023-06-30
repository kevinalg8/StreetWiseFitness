import { Router } from "express"
import * as controllerProds from "../controllers/controller.productos.js"
import * as controllers from "../controllers/controller.usuarios.js"
import * as planControllers from "../controllers/controller.planes.js"
import * as planRecetas from "../controllers/controller.recetas.js"
import {validateToken} from '../middlewares/middleware.js'

const inicio = Router();

inicio.get('/', (req, res)=>{res.render("inicio", {"rol":0})})
inicio.get('/productos',validateToken,controllerProds.getProductos)
inicio.get('/trenInferior',validateToken,controllerProds.getProdinf)
inicio.get('/trenSuperior',validateToken,controllerProds.getProdsup)
inicio.get('/plangeneral',validateToken,controllerProds.getProdgen)
inicio.get('/recetas',validateToken,planRecetas.getRecetaUser)
inicio.get('/createPlan', planControllers.getAllplanes)
inicio.post('/guardarPlan', planControllers.createPlanes)
inicio.post('/guardarReceta',planRecetas.crearReceta)
inicio.get('/cerrarSesion',controllers.cerrarSesion)

export default inicio;