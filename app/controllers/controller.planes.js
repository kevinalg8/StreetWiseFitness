import fetch from "node-fetch";
import axios from "axios";
import PDFDocument from "pdfkit-table";
import excel from "exceljs";

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

export const getPlanes = async (req, res) => {
  try {
    let ruta = 'http://localhost:3000/plan/AllPlanUser';
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

export const disablePlan = async (req, res) => {
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
    let ruta = `http://localhost:3000/plan/disable/${req.query.id}`;
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
    res.redirect("planes")
  } catch (error) {
    console.log(error);
  }
};

export const generarPdfPlan = async (req, res) => {
  try {
    // Hacer una solicitud GET a la API para obtener la información
    const response = await axios.get('http://localhost:3000/plan/AllPlanUser');
    const usuarioslData = response.data[0]; // Obtener el primer elemento del arreglo

    // Crear un nuevo documento PDF
    const doc = new PDFDocument({ margin: 30, size: 'A4' });

    // Stream el contenido PDF a la respuesta HTTP
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=planes.pdf');
    doc.pipe(res);


    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;

    // Agregar el encabezado
    doc.fontSize(24).text('Registro de planes', { align: 'center' });

    // Agregar espacio después del encabezado
    doc.moveDown();

    // Crear la tabla
    const table = {
      headers: ['ID', 'ID USUARIO', 'ID PLAN', 'NOMBRE', 'DESCRIPCION'],
      rows: usuarioslData.map(planes => 
        [
        planes.COD_USERPLAN,
        planes.COD_USUARIO,
        planes.COD_PLAN,
        planes.NOMBRE,
        planes.DESCRIPCION
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

export const generarExcelPlan = async (req, res) => {
  try {
    // Hacer una solicitud GET a la API para obtener la información
    const response = await axios.get('http://localhost:3000/plan/AllPlanUser');
    const usuarioData = response.data[0]; // Obtener el primer elemento del arreglo

    // Crear un nuevo libro de Excel
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Usuarios');

     // Mostrar información por consola
     console.log('Información del Plan:');
     usuarioData.forEach((planes) => {
       console.log(`ID: ${planes.COD_USERPLAN}`);
       console.log(`Nombre del usuario: ${planes.COD_USUARIO}`);
       console.log(`Apellido del usuario: ${planes.COD_PLAN}`);
       console.log(`Fecha nacimiento del usuario: ${planes.NOMBRE}`);
       console.log(`Correo del usuario: ${planes.DESCRIPCION}`);
     });

    // Agregar encabezados de columna
    worksheet.columns = [
      { header: 'ID', key: 'COD_USERPLAN', width: 10 },
      { header: 'ID usuario ', key: 'COD_USUARIO', width: 20 },
      { header: 'ID plan', key: 'COD_PLAN', width: 15 },
      { header: 'Nombre', key: 'NOMBRE', width: 15 },
      { header: 'Descripcion', key: 'DESCRIPCION', width: 100 },
    ];

    // Agregar filas con datos
    usuarioData.forEach((planes) => {
      worksheet.addRow({
        COD_USERPLAN: planes.COD_USERPLAN,
        COD_USUARIO: planes.COD_USUARIO,
        COD_PLAN: planes.COD_PLAN,
        NOMBRE: planes.NOMBRE,
        DESCRIPCION: planes.DESCRIPCION
      });
    });

    // Stream el contenido Excel a la respuesta HTTP
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=planes.xlsx');
    await workbook.xlsx.write(res);

    // Finalizar la escritura del libro de Excel
    res.end();
  } catch (error) {
    // Manejar errores de solicitud o cualquier otro error
    console.error(error);
    res.status(500).send('Error al generar el archivo Excel');
  }
};