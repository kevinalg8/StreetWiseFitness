import { Router } from "express"
import * as controllers from "../controllers/controllers.inicio.js"
import * as controller from "../controllers/controller.login.js"

const login = Router();

login.get('/', controller.loginUsuario)
login.post('/login', controller.loginUsuario)
login.get('/inicio', controllers.getReuniones)
login.get('/RegistroUsuario', (req, res)=>{res.render("registroUsuario")})
//login.get('/registroUsuario', controllers.getUsuarios)
login.get('/registroEntrenador', (req, res)=>{res.render("registroEntrenador")})

export default login;