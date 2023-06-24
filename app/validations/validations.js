import { check } from "express-validator";
import { validateResults } from "../middlewares/middleware.validates.js";

export const validateUserReg = [
    check('NOMBRES')
        .exists()
        .not()
        .isEmpty(),
    check('CELULAR')
        .exists()
        .not()
        .isEmpty()
        .isNumeric(),
    check('FECHA_NACIMIENTO')
        .exists()
        .isDate(),
    check('CORREO')
        .exists()
        .isEmail(),
    check('CONTRASENA')
        .exists()
        .isLength({min:8}),
    (req, res, next) => {
        validateResults(req, res, next)
    }

]

export const validateUserLogin = [
    check('CORREO')
        .exists()
        .isEmail(),
    check('CONTRASENA')
        .exists()
        .isLength({min:8}),
    (req, res, next) => {
        validateResults(req, res, next)
    }

]
