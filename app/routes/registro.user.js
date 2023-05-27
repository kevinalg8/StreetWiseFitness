import { Router } from "express"
import dotenv from "dotenv";
import * as controllers from "../controllers/controller.regUsuario.js"

dotenv.config();
const registro = Router();

registro.get('/registroUsuario', controllers.getUsuarios)

export default registro;