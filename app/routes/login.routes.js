import { Router } from "express"

const login = Router();

login.get('/', (req, res)=>{res.render("login")})
login.get('/inicio', (req, res)=>{res.render("inicio")})


export default login;