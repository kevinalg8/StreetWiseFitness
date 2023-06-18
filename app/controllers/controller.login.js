import fetch from "node-fetch";
export const loginUsuario = async(req, res)=>{
  try {  
      let data ={
          CORREO: req.body.CORREO,
          CONTRASENA: req.body.CONTRASENA
        }
        console.log(data);
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
              if (usuarios) {
                if (data.CORREO == usuarios.CORREO && data.CONTRASENA == usuarios.CONTRASENA) {
                res.render("inicio",{
                    "user":usuarios
                  });
                }else{
                  res.redirect("/registroUsuario")
                }
                
              }else{
                res.redirect("/registroUsuario")
              }
            } catch (error) {
        console.log(error);
    }
}
