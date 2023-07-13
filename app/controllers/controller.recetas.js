import fetch from "node-fetch";
import axios from "axios";
import PDFDocument from "pdfkit-table";
import excel from "exceljs";
import path from "path";

export const getReceta = async (req, res) => {
    try {
      // Construir la URL de la ruta de la API para obtener todas las recetas
      let ruta =  process.env.URL_BACKEND + '/recipes/AllRecipe';
      // Configurar las opciones para la solicitud GET
      let option = {
        method: "GET"
      };
      let Recetas = {};
      // Realizar la solicitud GET para obtener todas las recetas
      const resultado = await fetch(ruta, option)
        .then(response => response.json())
        .then(data => {
          Recetas = data[0];
        })
        .catch(err => console.error("Error en peticion: " + err));
  // Renderizar la plantilla "adminReceta" con las recetas obtenidas
      res.render("adminReceta", {
        "recipes": Recetas
      });
      
      console.log(Recetas);
    } catch (error) {
      console.log(error);
    }
    
};

export const crearReceta = async (req, res) => {
  if(req.body.NOMBRE && req.body.DESCRIPCION){
// Crear un objeto de datos con los campos de la receta
      let data = {
        NOMBRE: req.body.NOMBRE,
        DESCRIPCION: req.body.DESCRIPCION,
        INGREDIENTES: req.body.INGREDIENTES
      }
      let metodo = "POST";
      let url =  process.env.URL_BACKEND + '/recipes/rec';
      // Configurar las opciones para la solicitud POST
      let option = {
        method: metodo,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    try {
      // Realizar la solicitud POST para crear la receta
      const respuesta = fetch(url, option)
          .then(response => response.json())
          .then(data =>
              //data:data
              console.log(`Receta Creada`))
          .catch(err => console.log(`Error: ${err}`))
  } catch (error) {
      console.log(`error en ${error}`);
  }
  // Redirigir a la página de recetas
  res.redirect("recetas")
  }

};

export const getRecetaUser = async (req, res) => {
  try {
    // Construir la URL de la ruta de la API para obtener todas las recetas
    let ruta =  process.env.URL_BACKEND + '/recipes/AllRecipe';
    // Configurar las opciones para la solicitud GET
    let option = {
      method: "GET"
    };
    let Recetas = {};
    // Realizar la solicitud GET para obtener todas las recetas
    const resultado = await fetch(ruta, option)
      .then(response => response.json())
      .then(data => {
        Recetas = data[0];
      })
      .catch(err => console.error("Error en peticion: " + err));
      // Renderizar la plantilla "recipes" con las recetas obtenidas
    res.render("recipes", {
      "recipesUser": Recetas
    });
  } catch (error) {
    console.log(error);
  }
};

export const disableReceta = async (req, res) => {
    let estado = req.query.estado
    // Cambiar el estado de la receta
    if (estado == 1) {
      estado = 0
    } else {
      estado = 1
    }
    try {
      // Crear un objeto de datos con el nuevo estado
      let data = {
        ESTADO: estado
      }
      console.log(data);
      // Construir la URL de la ruta de la API
      let ruta =  `${process.env.URL_BACKEND}/recipes/rec${req.query.id}`
      // Configurar las opciones para la solicitud PATCH
      let option = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      };
      console.log(data);
      let estad = {};
      // Realizar la solicitud PATCH para deshabilitar la receta
      const resultado = await fetch(ruta, option)
      .then(response => response.json())
      .then(data => {
          console.log(data);
        })
        .catch(err => console.error("Error en peticion: " + err));
        // Redirigir a la página de recetas
      res.redirect("receta")
    } catch (error) {
      console.log(error);
    }
};

export const generarPdfReceta = async (req, res) => {
    try {
      // Hacer una solicitud GET a la API para obtener la información
      const response = await axios.get(process.env.URL_BACKEND+ '/recipes/AllRecipe');
      const usuarioslData = response.data[0]; // Obtener el primer elemento del arreglo
  
      // Crear un nuevo documento PDF
      const doc = new PDFDocument({ margin: 30, size: 'A4' });
  
      // Stream el contenido PDF a la respuesta HTTP
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=recetas.pdf');
      doc.pipe(res);

  
// Agregar el logo del proyecto
const logoHeight = 50;
const logoWidth = 50;
const __dirname = path.resolve()
const imagePath = path.resolve(path.join(__dirname,'public', 'img', 'Logo.png')) ;
console.log(imagePath);
const pageWidth = doc.page.width;

const logoX = (pageWidth - logoWidth) / 2;
const logoY = 30;

const pageHeight = doc.page.height;


doc.image(imagePath, logoX, logoY, { width: logoWidth, height: logoHeight });

// Agregar espacio después de la imagen
doc.moveDown(2);
  
  
  
      // Agregar el encabezado
      doc.fontSize(24).text('Registro de recetas', { align: 'center' });
  
      // Agregar espacio después del encabezado
      doc.moveDown();
  
      // Crear la tabla
      const table = {
        headers: ['ID', 'NOMBRE', 'DESCRIPCION', 'INGREDIENTES'],
        rows: usuarioslData.map(recetas => 
          [
          recetas.COD_RECETA,
          recetas.NOMBRE,
          recetas.DESCRIPCION,
          recetas.INGREDIENTES
        ])
      };
  
      // Agregar la tabla al documento con un tamaño de letra más pequeño
      await doc.table(table, { width: 500, prepareHeader: () => doc.font('Helvetica-Bold').fontSize(10), prepareRow: () => doc.font('Helvetica').fontSize(10) });
  
      // Agregar el pie de página
      const generador = 'StreetWise';
      const fechaImpresion = new Date().toLocaleString();
      doc.fontSize(10).text(`Generado por: ${generador}`);
      doc.fontSize(10).text(`Fecha y hora de impresión: ${fechaImpresion}`, { align: 'right' });
  
      // Finalizar el PDF
      doc.end();
    } catch (error) {
      // Manejar errores de solicitud o cualquier otro error
      console.error(error);
      res.status(500).send('Error al generar el PDF');
    }
};

export const generarExcelReceta = async (req, res) => {
    try {
      // Hacer una solicitud GET a la API para obtener la información
      const response = await axios.get(process.env.URL_BACKEND + '/recipes/AllRecipe');
      const usuarioData = response.data[0]; // Obtener el primer elemento del arreglo
  
      // Crear un nuevo libro de Excel
      const workbook = new excel.Workbook();
      const worksheet = workbook.addWorksheet('Recetas');
  
       // Mostrar información por consola
       console.log('Información de recetas:');
       usuarioData.forEach((recetas) => {
         console.log(`ID: ${recetas.COD_RECETA}`);
         console.log(`NOMBRE: ${recetas.NOMBRE}`);
         console.log(`DESCRIPCION: ${recetas.DESCRIPCION}`);
         console.log(`INGREDIENTES: ${recetas.INGREDIENTES}`);
       });
  
      // Agregar encabezados de columna
      worksheet.columns = [
        { header: 'ID', key: 'COD_RECETA', width: 10 },
        { header: 'NOMBRE ', key: 'NOMBRE', width: 20 },
        { header: 'DESCRIPCION', key: 'DESCRIPCION', width: 15 },
        { header: 'INGREDIENTES', key: 'INGREDIENTES', width: 15 },
        { header: 'ESTADO', key: 'ESTADO', width: 10 },
      ];
  
      // Agregar filas con datos
      usuarioData.forEach((planes) => {
        worksheet.addRow({
          COD_RECETA: planes.COD_RECETA,
          NOMBRE: planes.NOMBRE,
          DESCRIPCION: planes.DESCRIPCION,
          COD_USUARIO: planes.INGREDIENTES,
          ESTADO: planes.ESTADO
        });
      });
  
      // Stream el contenido Excel a la respuesta HTTP
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=recetas.xlsx');
      await workbook.xlsx.write(res);
  
      // Finalizar la escritura del libro de Excel
      res.end();
    } catch (error) {
      // Manejar errores de solicitud o cualquier otro error
      console.error(error);
      res.status(500).send('Error al generar el archivo Excel');
    }
};
  
