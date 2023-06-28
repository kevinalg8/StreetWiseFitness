import { Router } from "express"
import * as controllers from "../controllers/controller.usuarios.js"
import * as planControllers from "../controllers/controller.planes.js"
import {validateToken} from '../middlewares/middleware.js'

const admin = Router();

admin.get('/',controllers.getUsuarios)
admin.get('/CrearPlanes',(req,res)=>{res.render("createPlan")})
admin.post('/CrearElPlan',planControllers.createPlanes)
admin.post('/disable-user',controllers.inhabilitar)
admin.get('/cerrarSesion',controllers.cerrarSesion)

export default admin;