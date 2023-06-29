import { Router } from "express"
import * as controllers from "../controllers/controller.usuarios.js"
import * as planControllers from "../controllers/controller.planes.js"
import * as recetaControllers from "../controllers/controller.recetas.js"
import {validateToken} from '../middlewares/middleware.js'

const admin = Router();

admin.get('/',controllers.getUsuarios)

// PLANES
admin.get('/CrearPlanes',(req,res)=>{res.render("createPlan")})
admin.post('/CrearElPlan',planControllers.createPlanes)
admin.post('/disable-plan',planControllers.disablePlan)

// USUARIOS
admin.post('/disable-user',controllers.inhabilitar)
admin.get('/cerrarSesion',controllers.cerrarSesion)
admin.get('/planes', planControllers.getPlanes)

// RECETAS
admin.get('/receta', recetaControllers.getReceta)
admin.post('/disable-receta', recetaControllers.disableReceta)

// REPORTES RECETAS
admin.post('/generarPdfReceta', recetaControllers.generarPdfReceta)
admin.post('/generarExcelReceta', recetaControllers.generarExcelReceta)


// REPORTES USUARIO
admin.post('/generarPdf', controllers.generarPdf)
admin.post('/generarExcel', controllers.generarExcel)

// REPORTES PLAN
admin.post('/generarPdfPlan', planControllers.generarPdfPlan)
admin.post('/generarExcelPlan', planControllers.generarExcelPlan)
export default admin;