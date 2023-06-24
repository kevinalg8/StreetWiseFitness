import fetch from "node-fetch";

export const getPlanes = async (req, res) => {
    try {
      let ruta = "http://localhost:3000/plan/AllPlanUser";
      let option = {
        method: "GET"
      };
      let planes = {};
      const resultado = await fetch(ruta, option)
        .then(response => response.json())
        .then(data => {
          planes = data[0];
        })
        .catch(err => console.error("Error en peticion: " + err));
  
      res.render("admin-plan", {
        "plans": planes
      });
      console.log(planes);
    } catch (error) {
      console.log(error);
    }
  };