import fetch from "node-fetch";

export const getReceta = async (req, res) => {
    try {
      let ruta = 'http://localhost:3000/recipe/AllRecipe';
      let option = {
        method: "GET"
      };
      let Recetas = {};
      const resultado = await fetch(ruta, option)
        .then(response => response.json())
        .then(data => {
          Recetas = data[0];
        })
        .catch(err => console.error("Error en peticion: " + err));
  
      res.render("adminReceta", {
        "recipes": Recetas
      });
      
      console.log(Recetas);
    } catch (error) {
      console.log(error);
    }
};


export const disableReceta = async (req, res) => {
    let estado = req.query.estado
    if (estado == 1) {
      estado = 0
    } else {
      estado = 1
    }
    try {
      let data = {
        ESTADO: estado
      }
      console.log(data);
      let ruta = `http://localhost:3000/recipe/rec/${req.query.id}`;
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
      res.redirect("receta")
    } catch (error) {
      console.log(error);
    }
  };
  
  export const crearReceta = async (req, res) => {
    if(req.body.NOMBRE && req.body.DESCRIPCION){
  
        let data = {
          NOMBRE: req.body.NOMBRE,
          DESCRIPCION: req.body.DESCRIPCION
        }
        let metodo = "POST";
        let url = process.env.API_URL + '/rec';
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
                console.log(`Receta Creada`))
            .catch(err => console.log(`Error: ${err}`))
    } catch (error) {
        console.log(`error en ${error}`);
    }
    //res.redirect("/")
    }
  
  }