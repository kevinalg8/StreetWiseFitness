import { Router } from "express"
import * as controllerProds from "../controllers/controller.productos.js"
import * as controllers from "../controllers/controller.usuarios.js"
import * as planControllers from "../controllers/controller.planes.js"
import * as planRecetas from "../controllers/controller.recetas.js"
import {validateToken} from '../middlewares/middleware.js'

const inicio = Router();
// Ruta para la página de inicio
inicio.get('/', (req, res)=>{res.render("inicio", {"rol":0})})
// Rutas para obtener productos
inicio.get('/productos',validateToken,controllerProds.getProductos)
inicio.get('/trenInferior',validateToken,controllerProds.getProdinf)
inicio.get('/trenSuperior',validateToken,controllerProds.getProdsup)
inicio.get('/plangeneral',validateToken,controllerProds.getProdgen)
// Ruta para obtener las recetas del usuario
inicio.get('/recetas',validateToken,planRecetas.getRecetaUser)
// Ruta para obtener todos los planes
inicio.get('/createPlan',validateToken ,planControllers.getAllplanes)
// Rutas para guardar un plan y una receta
inicio.post('/guardarPlan',validateToken,planControllers.createPlanes)
inicio.post('/guardarReceta',validateToken,planRecetas.crearReceta)
// Ruta para cerrar sesión
inicio.get('/cerrarSesion',controllers.cerrarSesion)

export default inicio;