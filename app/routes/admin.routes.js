import { Router } from "express"
import dotenv from "dotenv";
import * as controllers from '../controllers/controller.usuarios.js'

dotenv.config()
const admin = Router();

admin.get('/admin', controllers.getUsuarios);
admin.post("/disable-user", controllers.inhabilitar)

export default admin;