import { validationResult } from "express-validator";

/*
Este middleware se puede utilizar en las rutas donde se han aplicado las validaciones para verificar si hay errores de validación
*/

export const validateResults=(req,res,next)=>{
    try {
        // Verificar los resultados de las validaciones
        validationResult(req).throw()
        // Si no hay errores de validación, pasar al siguiente middleware
        next()
    } catch (error) {
        res.redirect("/?error=1")
        console.log(error);   
    }
}