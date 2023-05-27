import { Router } from "express"
import * as controllers from "../controllers/controller.regUsuario.js"

const login = Router();

login.get('/', (req, res)=>{res.render("login")})
login.get('/inicio', (req, res)=>{res.render("inicio")})
login.get('/registroUsuario', controllers.getUsuarios)
login.get('/registroEntrenador', (req, res)=>{res.render("registroEntrenador")})


export default login;