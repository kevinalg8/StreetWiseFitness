import { check } from "express-validator";
import { validateResults } from "../middlewares/middleware.validates.js";
// Validación para el registro de usuario
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
// Validación para el inicio de sesión de usuario
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
