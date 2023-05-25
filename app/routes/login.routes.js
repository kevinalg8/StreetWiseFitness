import { Router } from "express"

const login = Router();

login.get('/', (req, res)=>{res.render("login.ejs")})
login.get('/inicio', (req, res)=>{res.render("inicio.ejs")})


export default login;