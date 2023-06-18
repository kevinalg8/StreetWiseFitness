import fetch from "node-fetch";
import dotenv from "dotenv"

dotenv.config()

export const getReuniones = async(req, res) =>{
    try {
        let url = 'https://api.zoom.us/v2/users/me/meetings'
        let option ={
            method: 'GET'
        }
        let reuniones ={};
        const respuesta = await fetch(url, option)
        .then(response => response.json())
        .then(data =>{
            console.log(data)
        })
        .catch(err => console.log(`Error en la peticion ${err}`))
        res.render("inicio", {
            "meeting":reuniones
        })
    } catch (error) {
        res.redirect("/")
        console.log(error);
        
    }
}
