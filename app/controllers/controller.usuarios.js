import fetch from "node-fetch";
import jwt from "jsonwebtoken";

export const getUsuarios = async (req, res) => {
  try {
    let ruta = "http://localhost:3000/api/users";
    let option = {
      method: "GET"
    };
    let usuarios = {};
    const resultado = await fetch(ruta, option)
      .then(response => response.json())
      .then(data => {
        usuarios = data[0];
      })
      .catch(err => console.error("Error en peticion: " + err));

    res.render("admin", {
      "users": usuarios
    });
    // console.log(usuarios);
  } catch (error) {
    console.log(error);
  }
};
export const loginUsuario = async(req, res)=>{
  try {  
      let data ={
          CORREO: req.body.CORREO,
          CONTRASENA: req.body.CONTRASENA
        }
        let ruta = "http://localhost:3000/api/consult";
        let option = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        };
          console.log(data);
          let usuarios = {};
          const resultado = await fetch(ruta, option)
          .then(response => response.json())
          .then(data => {
            usuarios = data[0];
              })
              .catch(err => console.error("Error en peticion: " + err));
              if (usuarios && data) {
                if (data.CORREO == usuarios.CORREO && data.CONTRASENA == usuarios.CONTRASENA) {
                  const token = jwt.sign(usuarios, process.env.SECRET_KEY,{
                    expiresIn:process.env.EXPIRE_TOKEN
                  });
                  res.cookie("SWF",token)
                  res.render("inicio",{
                    "user":usuarios,
                    "menu":1
                  });
                  console.log(usuarios);
                }else{
                  res.redirect("/login")
                }
              }else{
                res.redirect("/registroUsuario")
              }
            } catch (error) {
        console.log(error);
    }
  };
export const inhabilitar = async(req, res) => {
  let estado= req.query.estado
  if (estado == 1) {
    estado = 0
  } else {
    estado = 1
  }
  try {  
    let data ={
        ESTADO:estado
      }
      console.log(data);
      let ruta = `http://localhost:3000/api/users/${req.query.id}`;
      let option = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      };
        console.log(data);
        let estad = {};
        const resultado = await fetch(ruta, option)
        .then(response => response.json())
        .then(data => {
          console.log(data);
            })
            .catch(err => console.error("Error en peticion: " + err));
            res.redirect("/admin")
          } catch (error) {
      console.log(error);
  }
};
export const insertUsuario = async(req, res) => {
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
      let url = 'http://localhost:3000/api/users';
      let option = {
          method: metodo,
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
      }
      try {
          const respuesta = await fetch(url, option)
              .then(response => response.json())
              .then(data =>
                  //data:data
                  console.log(`Usuario creado`))
                  .catch(err => console.log(`Error: ${err}`))
                  res.render("registroUsuario")
      } catch (error) {
          console.log(`error en ${error}`);
      }
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
      let url = 'http://localhost:3000/api/users';

      let option = {
          method: metodo,
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
      }
      try {
          const respuesta = await fetch(url, option)
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

