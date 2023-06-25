import { Router } from "express"
import * as controllers from "../controllers/controller.usuarios.js"
import * as controller from "../controllers/controller.regUsuario.js"
import * as validating from "../validations/validations.js"
//import * as validating from "../validations/validations.js";

const login = Router();

login.get('/',(req, res)=>{res.render("login")})
login.post('/auth/inicio',validating.validateUserLogin,controllers.loginUsuario)
login.get('/RegistroUsuario', (req, res)=>{res.render("registroUsuario")})
login.post('/guardar',validating.validateUserReg,controller.insertUsuario)
export default login;