import fetch from "node-fetch";
import jwt from "jsonwebtoken";

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
                    "user":usuarios
                    //"menu":1
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
}
export const inhabilitar = (req,res)=>{
  res.send(req.query.id + " nombre: " + req.query.nombre)
};


