import { Router } from "express";
import dotenv  from "dotenv";
import * as controllers from '../controllers/controller.productos.js'


dotenv.config();
const productos = Router();

productos.get('/productos', controllers.getProductos)

/* 
https://api.mercadolibre.com/sites/MCO/search?nickname=NUTRITIONEX
*/

export default productos;