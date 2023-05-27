import { Router } from "express"
import * as controllers from "../controllers/controller.productos.js"

const inicio = Router();

inicio.get('/', (req, res)=>{res.render("login")})
inicio.get('/Productos', controllers.getProductos)



export default inicio;