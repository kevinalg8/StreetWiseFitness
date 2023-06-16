import fetch from "node-fetch";

export const getUsuarios = async(req, res)=>{
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

    res.render("admin",{
        "users":usuarios
    });
    console.log(usuarios);
  } catch (error) {
    console.log(error);
  }
};
export const loginUsuario = async(req, res)=>{
  let data ={
    CORREO: req.body.CORREO,
    CONTRASENA: req.body.CONTRASENA
  }
    try {
      let ruta = "http://localhost:3000/api/consult";
      let option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
      };
      let usuarios = {};
      const resultado = await fetch(ruta, option)
        .then(response => response.json())
        .then(data => {
          usuarios = data[0];
        })
        .catch(err => console.error("Error en peticion: " + err));
  
      res.render("login",{
          "users":usuarios
      });
      console.log(usuarios);
    } catch (error) {
      console.log(error);
    }
  };

