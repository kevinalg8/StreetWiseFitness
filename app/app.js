import express from 'express';
import dotenv from 'dotenv';
import ejs from 'ejs';
import path from 'path';
import * as url from 'url';
import loginRoute from './routes/login.routes.js';
import inicioRoute from './routes/inicio.routes.js';
import productosRoute from './routes/productos.routes.js';
import regUsuarioRoute from './routes/registro.user.js';
import planesRoute from './routes/planes.routes.js';
import adminRoute from './routes/admin.routes.js';
import bodyParser from 'body-parser';


dotenv.config();
const app = express();
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

app.set("port", process.env.PORT || 9999);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.static(__dirname + '../public'));
app.use(bodyParser.urlencoded({ extended:false }));


app.use("/", loginRoute);

app.use("/inicio", inicioRoute);
app.get("/productos", productosRoute);
app.get("/planes", planesRoute);
app.post("/guardar", regUsuarioRoute);
app.get("/admin", adminRoute);
app.get("/edit-user", adminRoute)


export default app;