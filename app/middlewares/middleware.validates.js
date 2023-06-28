import { validationResult } from "express-validator";

export const validateResults=(req,res,next)=>{
    try {
        validationResult(req).throw()
        next()
    } catch (error) {
        res.redirect("/?error=1")
        console.log(error);   
    }
}