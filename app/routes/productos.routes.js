import { Router } from "express"
import fetch from "node-fetch";

const productos = Router();

//productos.get('/productos', (req, res)=>{res.render("productos")})

productos.get('/productos', async(req, res)=>{
    try {
        let url = 'https://api.mercadolibre.com/sites/MCO/search?nickname=NUTRITIONEX'
        let option ={
            method: "GET"
        }
        let datos = {};
        const respuesta = await fetch(url, option)
        .then(response => response.json())
        .then(data =>{
            console.log(data);
        })
        .catch(err =>console.log("error en peticion" +err))
        res.render("productos",{
            "datos":datos
        })
    } catch (error) {
        res.redirect("/inicio")
        console.log(error);
    }
})

/* 
https://api.mercadolibre.com/sites/MCO/search?nickname=NUTRITIONEX
*/

export default productos;