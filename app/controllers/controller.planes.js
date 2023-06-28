import fetch from "node-fetch";


/*
export const createPlanes = (req, res) => {
    try {
      let data = {
        NOMBRE: req.body.NOMBRE,
        DESCRIPCION: req.body.DESCRIPCION
    }
      let ruta = "http://localhost:3000/plan/createPlan";
      let option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
      const resultado = fetch(ruta, option)
        .then(response => response.json())
        .then(data => {
          console.log("plan creadro");
          //planes = data[0];
        })
        .catch(err => console.error("Error en peticion: " + err));
  
      res.render("createPlan", {
        "plans": planes
      });
    } catch (error) {
      console.log(error);
    }
};
 */

export const createPlanes =(req, res) => {
      let data = {
          NOMBRE: req.body.NOMBRE,
          DESCRIPCION: req.body.DESCRIPCION,
      }
      let metodo = "POST";
      let url ="http://localhost:3000/plan/createPlan";
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
                  console.log(`Plan Creado`))
              res.render("planes")
              .catch(err => console.log(`Error: ${err}`))
      } catch (error) {
          console.log(`error en ${error}`);
      }
      //res.redirect("/createPlan")
};