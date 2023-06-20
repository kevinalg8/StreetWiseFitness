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
}

