import fetch from "node-fetch";
import jwt from "jsonwebtoken";
import axios from "axios";
import PDFDocument from "pdfkit-table";
import path from 'path';

export const getUsuarios = async (req, res) => {
  try {
    let ruta = process.env.API_URL + '/users';
    let option = {
      method: "GET"
    };
    let usuarios = {};
    const resultado = await fetch(ruta, option)
      .then(response => response.json())
      .then(data => {
        usuarios = data[0];
      })
      .catch(err => console.error("Error en peticion: " + err));

    res.render("admin", {
      "users": usuarios
    });
    // console.log(usuarios);
  } catch (error) {
    console.log(error);
  }
};

export const loginUsuario = async (req, res) => {
  try {
    let dataLogin = {
      CORREO: req.body.CORREO,
      CONTRASENA: req.body.CONTRASENA
    }
    let ruta = process.env.API_URL + '/consult';
    let option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataLogin)
    };
    let datosDb = {};
    const resultado = await fetch(ruta, option)
      .then(response => response.json())
      .then(dataLogin => {
        datosDb = dataLogin[0];
      })
      .catch(err => console.error("Error en peticion: " + err));
      if (datosDb && dataLogin) {
      if (dataLogin.CORREO === datosDb.CORREO && dataLogin.CONTRASENA === datosDb.CONTRASENA) {
        const token = jwt.sign(datosDb, process.env.SECRET_KEY, {
          expiresIn: process.env.EXPIRE_TOKEN
        });
        res.cookie("SWF", token)
        if (datosDb.ESTADO == 1) {
          if (datosDb.COD_ROL === 1 || datosDb.COD_ROL ===2) {
            res.render("inicio", {
              "user": datosDb,
              "rol": datosDb.COD_ROL,
              "cod_User":datosDb.COD_USUARIO
            });
            console.log(datosDb.COD_USUARIO);
            try {
              console.log(datosDb.COD_USUARIO);
              let data = {
                NOMBRE: req.body.NOMBRE,
                DESCRIPCION: req.body.DESCRIPCION,
                COD_USUARIO: req.body.COD_USUARIO
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
            } catch (error) {
              
            }
          }
          if (datosDb.COD_ROL == 3) {
            try {
              let ruta = 'http://localhost:3000/api/users';
              let option = {
                method: "GET"
              };
              let usuarios = {};
              const resultado = await fetch(ruta, option)
                .then(response => response.json())
                .then(data => {
                  usuarios = data[0];
                })
                .catch(err => console.error("Error en peticion: " + err));
                console.log(usuarios);
                
              res.render("admin", {
                "users": usuarios,
                "rol":datosDb.COD_ROL
              });
            } catch (error) {
              console.log(error);
            }
          }
        }else{
          console.log("Usuario Inhabilitado");
        }
      }
      console.log(dataLogin);
    } else {
      //console.log(dataLogin,comparacionEncriptacion);
      res.redirect("/registroUsuario")
    }
  } catch (error) {
    console.log(error);
  }
};

export const inhabilitar = async (req, res) => {
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
    let ruta = `http://localhost:3000/api/users/${req.query.id}`;
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
    res.redirect("admin")
  } catch (error) {
    console.log(error);
  }
};

export const alerta = (req,res)=>{
  let Alerta = req.query.error
  console.log(req.query.error)
  res.render("login",{Alert:Alerta})
}

export const cerrarSesion = (req,res)=>{
  res.clearCookie("SWF");
  res.redirect("/");
}

export const generarPdf = async (req, res) => {
  try {
    // Hacer una solicitud GET a la API para obtener la información
    const response = await axios.get(process.env.API_URL + '/users');
    const usuarioslData = response.data[0]; // Obtener el primer elemento del arreglo

    // Crear un nuevo documento PDF
    const doc = new PDFDocument({ margin: 30, size: 'A4' });

    // Stream el contenido PDF a la respuesta HTTP
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=usuarios.pdf');
    doc.pipe(res);

    // Agregar el logo del proyecto
     const logoHeight = 50;
     const logoWidth = 50;
     const __dirname = path.resolve()
     const imagePath = path.resolve(path.join(__dirname, 'app', 'public', 'img', 'Logo.png')) ;
     const logoX = (pageWidth - logoWidth) / 2;
     const logoY = 30;

    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;


    // doc.image(imagePath, logoX, logoY, { width: logoWidth, height: logoHeight });

    // Agregar espacio después de la imagen
    doc.moveDown(2);

    // Agregar el encabezado
    doc.fontSize(24).text('Registro de usuarios', { align: 'center' });

    // Agregar espacio después del encabezado
    doc.moveDown();

    // Crear la tabla
    const table = {
      headers: ['ID', 'NOMBRE', 'APELLIDO', 'FECHA', 'CORREO', 'ROOL', 'ESTADO', 'CELULAR', 'CONTRASEÑA'],
      rows: usuarioslData.map(usuarios => [
        usuarios.COD_USUARIO,
        usuarios.NOMBRES,
        usuarios.APELLIDOS,
        usuarios.FECHA_NACIMIENTO,
        usuarios.CORREO,
        usuarios.COD_ROL,
        usuarios.ESTADO,
        usuarios.CELULAR,
        usuarios.CONTRASENA
      ])
    };

    // Agregar la tabla al documento con un tamaño de letra más pequeño
    await doc.table(table, { width: 500, prepareHeader: () => doc.font('Helvetica-Bold').fontSize(10), prepareRow: () => doc.font('Helvetica').fontSize(10) });

    // Agregar el pie de página
    const generador = 'StreetWise Fitness';
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