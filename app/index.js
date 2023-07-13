import app from "./app.js";

// Iniciar el servidor Express y escuchar en el puerto especificado
app.listen(app.get("port"), ()=> {
    console.log(`Se ha conectado al puerto ${app.get("port")}
    http://localhost:${app.get("port")}`);
})
