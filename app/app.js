import express from 'express';
import dotenv from 'dotenv';
import ejs from 'ejs';
import path from 'path';
import * as url from 'url';
import loginRoute from './routes/login.routes.js';
import inicioRoute from './routes/inicio.routes.js';
//import productosRoute from './routes/productos.routes.js';
import regUsuarioRoute from './routes/registro.user.js';
import planesRoute from './routes/planes.routes.js';
import adminRoute from './routes/admin.routes.js';
import authRoute from './routes/login.routes.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import jsonwebtoken from 'jsonwebtoken'
//import middleware from './middlewares/middleware.js'


dotenv.config();
const app = express();
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

app.set("port", process.env.PORT || 9999);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.static(__dirname + '../public'));
//Ensayar quitar
app.use(cookieParser())
//app.use(middleware())
app.use(express.urlencoded({ extended:false }));


app.use("/",loginRoute);

app.use("/",inicioRoute);

export default app;