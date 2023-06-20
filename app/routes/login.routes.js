import { Router } from "express"
//import * as controllers from "../controllers/controllers.inicio.js"
import * as controller from "../controllers/controller.usuarios.js"

const login = Router();

login.get('/', (req, res)=>{res.render("login")})
login.post('/auth', controller.loginUsuario)
login.get('/inicio', (req, res)=>{res.render("inicio")})
login.get('/RegistroUsuario', (req, res)=>{res.render("registroUsuario")})
//login.get('/registroUsuario', controllers.getUsuarios)

export default login;