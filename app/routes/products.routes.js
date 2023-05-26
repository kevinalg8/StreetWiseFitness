import { Router } from "express"

const product = Router();

product.get('/productos', (req, res)=>{res.render("Productos")})


export default product;