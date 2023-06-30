import { Router } from "express"
import * as controllers from "../controllers/controller.usuarios.js"
import * as planControllers from "../controllers/controller.planes.js"
import * as recetaControllers from "../controllers/controller.recetas.js"
import {validateToken} from '../middlewares/middleware.js'

const admin = Router();

admin.get('/',validateToken,controllers.getUsuarios)

// PLANES
admin.get('/CrearPlanes',validateToken,(req,res)=>{res.render("createPlan")})
admin.post('/CrearElPlan',validateToken,planControllers.createPlanes)
admin.post('/disable-plan',validateToken,planControllers.disablePlan)

// USUARIOS
admin.post('/disable-user',validateToken,controllers.inhabilitar)
admin.get('/cerrarSesion',validateToken,controllers.cerrarSesion)
admin.get('/planes',validateToken,planControllers.getPlanes)

// RECETAS
admin.get('/receta',validateToken,recetaControllers.getReceta)
admin.post('/disable-receta',validateToken,recetaControllers.disableReceta)

// REPORTES RECETAS
admin.post('/generarPdfReceta',validateToken,recetaControllers.generarPdfReceta)
admin.post('/generarExcelReceta',validateToken,recetaControllers.generarExcelReceta)


// REPORTES USUARIO
admin.post('/generarPdf',validateToken,controllers.generarPdf)
admin.post('/generarExcel',validateToken ,controllers.generarExcel)

// REPORTES PLAN
admin.post('/generarPdfPlan',validateToken,planControllers.generarPdfPlan)
admin.post('/generarExcelPlan',validateToken,planControllers.generarExcelPlan)
export default admin;