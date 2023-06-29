import fetch from "node-fetch";
import axios from "axios";
import PDFDocument from "pdfkit-table";
import excel from "exceljs";

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

  export const generarPdfReceta = async (req, res) => {
    try {
      // Hacer una solicitud GET a la API para obtener la información
      const response = await axios.get('http://localhost:3000/recipe/AllRecipe');
      const usuarioslData = response.data[0]; // Obtener el primer elemento del arreglo
  
      // Crear un nuevo documento PDF
      const doc = new PDFDocument({ margin: 30, size: 'A4' });
  
      // Stream el contenido PDF a la respuesta HTTP
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=recetas.pdf');
      doc.pipe(res);

  
      const pageWidth = doc.page.width;
      const pageHeight = doc.page.height;
  
  
  
      // Agregar el encabezado
      doc.fontSize(24).text('Registro de recetas', { align: 'center' });
  
      // Agregar espacio después del encabezado
      doc.moveDown();
  
      // Crear la tabla
      const table = {
        headers: ['ID', 'NOMBRE', 'DESCRIPCION', 'ID USUARIO', 'CORREO'],
        rows: usuarioslData.map(recetas => 
          [
          recetas.COD_RECETA,
          recetas.NOMBRE,
          recetas.DESCRIPCION,
          recetas.COD_USUARIO,
          recetas.CORREO
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
      const response = await axios.get('http://localhost:3000/recipe/AllRecipe');
      const usuarioData = response.data[0]; // Obtener el primer elemento del arreglo
  
      // Crear un nuevo libro de Excel
      const workbook = new excel.Workbook();
      const worksheet = workbook.addWorksheet('Usuarios');
  
       // Mostrar información por consola
       console.log('Información del Plan:');
       usuarioData.forEach((recetas) => {
         console.log(`ID: ${recetas.COD_RECETA}`);
         console.log(`NOMBRE: ${recetas.NOMBRE}`);
         console.log(`DESCRIPCION: ${recetas.DESCRIPCION}`);
         console.log(`COD_USUARIO: ${recetas.COD_USUARIO}`);
         console.log(`CORREO: ${recetas.CORREO}`);
       });
  
      // Agregar encabezados de columna
      worksheet.columns = [
        { header: 'ID', key: 'COD_RECETA', width: 10 },
        { header: 'ID usuario ', key: 'NOMBRE', width: 20 },
        { header: 'ID plan', key: 'DESCRIPCION', width: 15 },
        { header: 'Nombre', key: 'COD_USUARIO', width: 15 },
        { header: 'Descripcion', key: 'CORREO', width: 100 },
      ];
  
      // Agregar filas con datos
      usuarioData.forEach((planes) => {
        worksheet.addRow({
          COD_RECETA: planes.COD_RECETA,
          NOMBRE: planes.NOMBRE,
          DESCRIPCION: planes.DESCRIPCION,
          COD_USUARIO: planes.COD_USUARIO,
          CORREO: planes.CORREO
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
