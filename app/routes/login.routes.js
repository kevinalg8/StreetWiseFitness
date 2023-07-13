import { Router } from "express"
import * as controllers from "../controllers/controller.usuarios.js"
import * as controller from "../controllers/controller.regUsuario.js"
import * as validating from "../validations/validations.js"


const login = Router();
// Ruta para mostrar una alerta
login.get('/', controllers.alerta)
// Ruta para autenticar un usuario
login.post('/auth',validating.validateUserLogin,controllers.loginUsuario)
// Ruta para mostrar el formulario de registro de usuario
login.get('/RegistroUsuario', (req, res)=>{res.render("registroUsuario")})
// Ruta para guardar un nuevo usuario
login.post('/guardar',validating.validateUserReg,controller.insertUsuario)
export default login;