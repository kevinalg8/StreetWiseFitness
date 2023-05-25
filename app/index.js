import app from "./app.js";

app.listen(app.get("port"),()=>{
    console.log(`Se a conectado a ${app.get("port")}
    https://localhost:${app.get("port")}`);
})