import { Router } from "express"
//import * as controller from "../controllers/controller.regUsuario"
import * as controllers from "../controllers/controller.usuarios.js"
import {validateToken} from '../middlewares/middleware.js'

const login = Router();

login.get('/', (req, res)=>{res.render("login")})
login.post('/auth',controllers.loginUsuario)
login.get('/inicio', (req, res)=>{res.render("inicio")})
login.get('/RegistroUsuario', (req, res)=>{res.render("registroUsuario")})
//login.get('/registroUsuario', controllers.getUsuarios)

export default login;