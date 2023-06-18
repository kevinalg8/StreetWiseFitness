import { Router } from "express";
import dotenv  from "dotenv";
import * as controllers from '../controllers/controller.productos.js'


dotenv.config();
const productos = Router();

productos.get("/productos", controllers.getProductos)
//productos.get("/productos", controllers.getProds)
//productos.get('/productos',controllers.getProductos2)

/* 
https://api.mercadolibre.com/sites/MCO/search?nickname=NUTRITIONEX
*/

export default productos;