import express from 'express';
import dotenv from 'dotenv';
import ejs from 'ejs';
import path from 'path';
import * as url from 'url';
import loginRoute from './routes/login.routes.js';
import productRoute from './routes/products.routes.js';
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
app.get("/productos", productRoute);
// app.get("/", (req, res)=>{
//     res.send("hola")
// });

// module.exports = app;
export default app;