import fetch from "node-fetch";

export const insertUsuario = (req, res) => {
    if (req.body.COD_ROL === "Usuario") {
        let data = {
            NOMBRES: req.body.NOMBRES,
            APELLIDOS: req.body.APELLIDOS,
            CORREO: req.body.CORREO,
            CELULAR: req.body.CELULAR,
            FECHA_NACIMIENTO: req.body.FECHA_NACIMIENTO,
            CONTRASENA: req.body.CONTRASENA,
            COD_ROL: 1
        }
        let metodo = "POST";
        let url = process.env.API_UTL + '/users';
        let option = {
            method: metodo,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        try {
            const respuesta = fetch(url, option)
                .then(response => response.json())
                .then(data =>
                    //data:data
                    console.log(`Usuario creado`))
                .catch(err => console.log(`Error: ${err}`))
        } catch (error) {
            console.log(`error en ${error}`);
        }
        res.redirect("/")
    }else{
        let data = {
            NOMBRES: req.body.NOMBRES,
            APELLIDOS: req.body.APELLIDOS,
            CORREO: req.body.CORREO,
            CELULAR: req.body.CELULAR,
            FECHA_NACIMIENTO: req.body.FECHA_NACIMIENTO,
            CONTRASENA: req.body.CONTRASENA,
            COD_ROL: 2
        }
        console.log(data);
        let metodo = "POST";
        let url = process.env.API_UTL + '/users';

        let option = {
            method: metodo,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        try {
            const respuesta = fetch(url, option)
                .then(response => response.json())
                .then(data =>
                    //data:data
                    console.log(`Entrenador creado`))
                .catch(err => console.log(`Error: ${err}`))
        } catch (error) {
            console.log(`error en ${error}`);
        }
        res.redirect("/")
    }
}