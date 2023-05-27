import fetch from "node-fetch";

export const getUsuarios = async(req, res)=>{
    try {
        let url = 'http://localhost:3000/api/users';
        let option ={
            method: "GET"
        }
        let datos = {};
        const respuesta = await fetch(url,option)
        .then(response => response.json())
        .then(data =>
            console.log(data))
        .catch(err =>console.log(`Error: ${err}`))
        res.render("registroUsuario",{
            "datos":datos
        })
    } catch (error) {
        res.redirect("/login")
        console.log(`error en ${error}`);
    }
}