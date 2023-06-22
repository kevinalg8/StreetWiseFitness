import { Router } from "express"
import * as controllers from "../controllers/controller.usuarios.js"
import * as controller from "../controllers/controller.regUsuario.js"
//import {validateToken} from '../middlewares/middleware.js'


const login = Router();

login.get('/',(req, res)=>{res.render("login")})
login.post('/auth',controllers.loginUsuario)
login.get('/RegistroUsuario', (req, res)=>{res.render("registroUsuario")})
login.post('/guardar', controller.insertUsuario)
export default login;