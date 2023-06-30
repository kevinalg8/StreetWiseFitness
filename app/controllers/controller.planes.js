import fetch from "node-fetch";
import axios from "axios";
import PDFDocument from "pdfkit-table";
import excel from "exceljs";
import path from "path";

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

export const createPlanes =async(req, res) => {
      let data = {
          NOMBRE: req.body.NOMBRE,
          DESCRIPCION: req.body.DESCRIPCION,
          TELEFONO: req.body.TELEFONO
      }
      let metodo = "POST";
      let url = process.env.URL_BACKEND + 'plan/createPlan';
      let option = {
          method: metodo,
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
      }
      try {
          const respuesta = await fetch(url, option)
              .then(response => response.json())
              .then(data =>
                  //data:data
                  console.log(`Plan Creado`))
              res.redirect("createPlan")
              .catch(err => console.log(`Error: ${err}`))
      } catch (error) {
          console.log(`error en ${error}`);
      }
      //res.redirect("/createPlan")
};

export const getPlanes = async (req, res) => {
  try {
    let ruta =  process.env.URL_BACKEND + '/plan/AllPlans';
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
    console.log("hola");
  } catch (error) {
    console.log(error);
  }
};

export const getAllplanes = async (req, res) => {
  try {
    let ruta = process.env.URL_BACKEND + '/plan/AllPlans';
    let option = {
      method: "GET"
    };
    let plan = {};
    const resultado = await fetch(ruta, option)
      .then(response => response.json())
      .then(data => {
        plan = data[0];
      })
      .catch(err => console.error("Error en peticion: " + err));

    res.render("createPlan", {
      "planes": plan
    });
    console.log(plan);
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
    const response = await axios.get('http://localhost:3000/plan/AllPlans');
    const usuarioslData = response.data[0]; // Obtener el primer elemento del arreglo

    // Crear un nuevo documento PDF
    const doc = new PDFDocument({ margin: 30, size: 'A4' });

    // Stream el contenido PDF a la respuesta HTTP
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=planes.pdf');
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
    doc.fontSize(24).text('Registro de planes', { align: 'center' });

    // Agregar espacio después del encabezado
    doc.moveDown();

    // Crear la tabla
    const table = {
      headers: ['ID', 'NOMBRE', 'DESCRIPCION', 'TELEFONO', 'ESTADO'],
      rows: usuarioslData.map(planes => 
        [
        planes.COD_PLAN,
        planes.NOMBRE,
        planes.DESCRIPCION,
        planes.TELEFONO,
        planes.ESTADO
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
    const response = await axios.get('http://localhost:3000/plan/AllPlans');
    const usuarioData = response.data[0]; // Obtener el primer elemento del arreglo

    // Crear un nuevo libro de Excel
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Usuarios');

     // Mostrar información por consola
     console.log('Información del Plan:');
     usuarioData.forEach((planes) => {
       console.log(`ID: ${planes.COD_PLAN}`);
       console.log(`NOMBRE: ${planes.NOMBRE}`);
       console.log(`DESCRIPCION: ${planes.DESCRIPCION}`);
       console.log(`TELEFONO: ${planes.TELEFONO}`);
       console.log(`ESTADO: ${planes.ESTADO}`);
     });

    // Agregar encabezados de columna
    worksheet.columns = [
      { header: 'ID', key: 'COD_PLAN', width: 10 },
      { header: 'NOMBRE ', key: 'NOMBRE', width: 20 },
      { header: 'DESCRIPCION', key: 'DESCRIPCION', width: 15 },
      { header: 'TELEFONO', key: 'TELEFONO', width: 15 },
      { header: 'ESTADO', key: 'ESTADO', width: 10 },
    ];

    // Agregar filas con datos
    usuarioData.forEach((planes) => {
      worksheet.addRow({
        COD_PLAN: planes.COD_PLAN,
        NOMBRE: planes.NOMBRE,
        DESCRIPCION: planes.DESCRIPCION,
        TELEFONO: planes.TELEFONO,
        ESTADO: planes.ESTADO
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
