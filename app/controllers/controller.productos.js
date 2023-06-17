import fetch from "node-fetch";
export const getProductos = async(req,res)=>{
    try {
        let url = 'https://api.mercadolibre.com/sites/MCO/search?nickname=NUTRITIONEX&limit=5'
        let option ={
            method: "GET"
        }
        let productos = {}
        let vendedor = {};
        const respuesta = await fetch(url,option)
        .then(response => response.json())
        .then(data =>{
            //console.log(data);
            productos = data.results,
            vendedor = data.seller
        })
        .catch(err =>console.log("error en peticion" +err))
        // console.log(productos.title);
        res.render("productos",{
            "produc":productos,
            "tienda": vendedor
        })
    } catch (error) {
        res.redirect("/inicio")
        console.log(error);
    };
}
