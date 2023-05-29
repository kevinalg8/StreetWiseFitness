import { Router } from "express"
import dotenv from "dotenv";
import * as controllers from "../controllers/controller.regUsuario.js"

dotenv.config();
const registro = Router();

//registro.get('/Registro', (req, res)=>{res.render("registroUsuario")})
registro.post('/guardar', controllers.insertUsuario)

export default registro;