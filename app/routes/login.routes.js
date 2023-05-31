import { Router } from "express"
import * as controllers from "../controllers/controllers.inicio.js"

const login = Router();

login.get('/', (req, res)=>{res.render("login")})
login.get('/inicio', controllers.getReuniones)
login.get('/RegistroUsuario', (req, res)=>{res.render("registroUsuario")})
//login.get('/registroUsuario', controllers.getUsuarios)
login.get('/registroEntrenador', (req, res)=>{res.render("registroEntrenador")})


export default login;