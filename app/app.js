import express from 'express';
import dotenv from 'dotenv';
import ejs from 'ejs';
import path from 'path';
import * as url from 'url';
import loginRoute from './routes/login.routes.js';
import homeRoute from './routes/inicio.routes.js';
import adminRoute from './routes/admin.routes.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';



dotenv.config();
const app = express();
const __dirname = path.resolve();


// Configuración de la aplicación Express
app.set("port", process.env.PORT || 9999);
app.set("views",path.resolve(path.join(__dirname, "app", "views")));
app.set("view engine", "ejs");

// Middlewares
app.use(express.json());
app.use(express.static(__dirname + '/public'));
//Ensayar quitar
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended:false }));


//Rutas
app.use("/",loginRoute);
app.use("/admin",adminRoute);
app.use("/inicio",homeRoute);

export default app;