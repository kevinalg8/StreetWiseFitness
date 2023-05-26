import { Router } from "express"

const login = Router();

login.get('/', (req, res)=>{res.render("login")})
login.get('/inicio', (req, res)=>{res.render("inicio")})
login.get('/registro', (req, res)=>{res.render("registroUsuario")})
login.get('/registroEntrenador', (req, res)=>{res.render("registroEntrenador")})


export default login;