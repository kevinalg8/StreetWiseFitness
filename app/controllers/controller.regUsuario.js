import fetch from "node-fetch";

export const insertUsuario =(req, res) => {
    if (req.body.COD_ROL === "Usuario") {
        // Crear objeto de datos para un usuario
        let data = {
            NOMBRES: req.body.NOMBRES,
            APELLIDOS: req.body.APELLIDOS,
            CORREO: req.body.CORREO,
            CELULAR: req.body.CELULAR,
            FECHA_NACIMIENTO: req.body.FECHA_NACIMIENTO,
            CONTRASENA: req.body.CONTRASENA,
            COD_ROL: 1 // Código de rol para usuario
        }
        let metodo = "POST";
        let url = process.env.URL_BACKEND + '/api/users';
        let option = {
            method: metodo,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data) // Convertir datos a formato JSON y asignarlos al cuerpo de la solicitud
        }
        try {
            const respuesta = fetch(url, option)
                .then(response => response.json())
                .then(data =>
                    //data:data
                    console.log(`Usuario creado`)) // Imprimir mensaje de éxito
                .catch(err => console.log(`Error: ${err}`))// Capturar y mostrar cualquier error
        } catch (error) {
            console.log(`error en ${error}`);
        }
        res.redirect("/")//Redigir al inicio
    }else{
        // Crear objeto de datos para un entrenador
        let data = {
            NOMBRES: req.body.NOMBRES,
            APELLIDOS: req.body.APELLIDOS,
            CORREO: req.body.CORREO,
            CELULAR: req.body.CELULAR,
            FECHA_NACIMIENTO: req.body.FECHA_NACIMIENTO,
            CONTRASENA: req.body.CONTRASENA,
            COD_ROL: 2 // Código de rol para entrenador
        }
        console.log(data);
        let metodo = "POST";
        let url = process.env.URL_BACKEND + '/api/users';

        let option = {
            method: metodo,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)// Convertir datos a formato JSON y asignarlos al cuerpo de la solicitud
        }
        try {
            const respuesta = fetch(url, option)
                .then(response => response.json())
                .then(data =>
                    //data:data
                    console.log(`Entrenador creado`))//Mensaje de exito
                .catch(err => console.log(`Error: ${err}`))//Capturar y mostrar el error por consola
        } catch (error) {
            console.log(`error en ${error}`);
        }
        res.redirect("/")//Redirige al inicio 
    }
}