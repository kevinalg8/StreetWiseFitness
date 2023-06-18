import fetch from "node-fetch";

export const getProductos = async (req, res) => {
  try {
    let url1 = 'https://api.mercadolibre.com/sites/MCO/search?nickname=TUMEJORCOMPRA0&limit=5';
    let url2 = 'https://api.mercadolibre.com/sites/MCO/search?nickname=NUTRITIONEX&limit=5';
    let url3 = 'https://api.mercadolibre.com/sites/MCO/search?nickname=ENVIOS+SUPLEMENTOS&limit=5'

    let option = {
      method: "GET"
    };

    const response1 = await fetch(url1, option);
    const data1 = await response1.json();
    console.log(data1);

    const response2 = await fetch(url2, option);
    const data2 = await response2.json();
    console.log(data2);

    const response3 = await fetch(url3, option);
    const data3 = await response3.json();
    console.log(data3);

    let productos = data1.results;
    let vendedor = data1.seller;
    let prod = data2.results;
    let seller = data2.seller;
    let product = data3.results;
    let sell = data3.seller;

    res.render("productos", {
      "produc": productos,
      "tienda": vendedor,
      "produ": prod,
      "store": seller,
      "product": product,
      "sell": sell 
    });

  } catch (error) {
    res.redirect("/inicio");
    console.log(error);
  }
}

  
