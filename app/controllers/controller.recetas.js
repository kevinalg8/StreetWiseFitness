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