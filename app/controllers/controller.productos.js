import fetch from "node-fetch";

export const getProductos = async (req, res) => {
  try {
    let url1 = 'https://api.mercadolibre.com/sites/MCO/search?nickname=TUMEJORCOMPRA0&limit=5';
    let url2 = 'https://api.mercadolibre.com/sites/MCO/search?nickname=NUTRITIONEX&limit=5';
    let url3 = 'https://api.mercadolibre.com/sites/MCO/search?nickname=ENVIOS+SUPLEMENTOS&limit=5';
    let url4 = 'https://api.mercadolibre.com/sites/MCO/search?nickname=FITSHOPCOL&limit=5';

    let option = {
      method: "GET"
    };

    const response1 = await fetch(url1, option);
    const data1 = await response1.json();
    //console.log(data1);

    const response2 = await fetch(url2, option);
    const data2 = await response2.json();
    //console.log(data2);

    const response3 = await fetch(url3, option);
    const data3 = await response3.json();
    //console.log(data3);

    const response4 = await fetch(url4, option);
    const data4 = await response4.json();

    let productos1 = data1.results;
    let vendedor1 = data1.seller;
    let productos2 = data2.results;
    let vendedor2 = data2.seller;
    let productos3 = data3.results;
    let vendedor3 = data3.seller;
    let productos4 = data4.results;
    let vendedor4 = data4.seller; 

    res.render("productos", {
      "produc1": productos1,
      "seller1": vendedor1,
      "produc2": productos2,
      "seller2": vendedor2,
      "produc3": productos3,
      "seller3": vendedor3,
      "produc4": productos4,
      "seller4": vendedor4
    });

  } catch (error) {
    res.redirect("/inicio");
    console.log(error);
  }
}
//Inferior
export const getProdinf = async (req, res) => {
  try {
    let url1 = 'https://api.mercadolibre.com/sites/MCO/search?nickname=FITNES+MARKET&limit=5';

    let option = {
      method: "GET"
    };

    const response = await fetch(url1, option);
    const data = await response.json();
    console.log(data);

    let productos = data.results;
    let vendedor = data.seller;


    res.render("trenInferior", {
      "produc1": productos,
      "seller1": vendedor,
    });

  } catch (error) {
    res.redirect("/inicio");
    console.log(error);
  }
}
//Superior
export const getProdsup = async (req, res) => {
  try {
    let url2 = 'https://api.mercadolibre.com/sites/MCO/search?nickname=NATURFITCOL+SUPLEMENTOS&limit=5';

    let option = {
      method: "GET"
    };

    const response = await fetch(url2, option);
    const data = await response.json();
    console.log(data);

    let productos = data.results;
    let vendedor = data.seller;


    res.render("trenSuperior", {
      "produc2": productos,
      "seller2": vendedor,
    });

  } catch (error) {
    res.redirect("/inicio");
    console.log(error);
  }
}
//General
export const getProdgen = async (req, res) => {
  try {
    let url3 = 'https://api.mercadolibre.com/sites/MCO/search?nickname=GOLI5769558&limit=5';

    let option = {
      method: "GET"
    };

    const response = await fetch(url3, option);
    const data = await response.json();
    console.log(data);

    let productos = data.results;
    let vendedor = data.seller;


    res.render("planGeneral", {
      "produc3": productos,
      "seller3": vendedor,
    });

  } catch (error) {
    res.redirect("/inicio");
    console.log(error);
  }
}
  
