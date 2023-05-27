import { Router } from "express";
import dotenv  from "dotenv";
import * as controllers from '../controllers/controller.productos.js'


dotenv.config();
const productos = Router();

productos.get('/productos', controllers.getProductos)

/*
productos.get('/productos', async(req, res)=>{
    try {
        let url = 'https://api.mercadolibre.com/sites/MCO/search?nickname=NUTRITIONEX'
        let option ={
            method: "GET"
        }
        let productos = {};
        const respuesta = await fetch(url, option)
        .then(response => response.json())
        .then(data =>{
            productos = data.results;
        })
        .catch(err =>console.log("error en peticion" +err))
        // console.log(productos.title);
        res.render("productos",{
            "produc":productos
        })
    } catch (error) {
        res.redirect("/inicio")
        console.log(error);
    }
})
*/

/* 
https://api.mercadolibre.com/sites/MCO/search?nickname=NUTRITIONEX
*/

export default productos;