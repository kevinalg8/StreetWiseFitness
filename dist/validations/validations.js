"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateUserReg = exports.validateUserLogin = void 0;
var _expressValidator = require("express-validator");
var _middlewareValidates = require("../middlewares/middleware.validates.js");
var validateUserReg = [(0, _expressValidator.check)('NOMBRES').exists().not().isEmpty(), (0, _expressValidator.check)('CELULAR').exists().not().isEmpty().isNumeric(), (0, _expressValidator.check)('FECHA_NACIMIENTO').exists().isDate(), (0, _expressValidator.check)('CORREO').exists().isEmail(), (0, _expressValidator.check)('CONTRASENA').exists().isLength({
  min: 8
}), function (req, res, next) {
  (0, _middlewareValidates.validateResults)(req, res, next);
}];
exports.validateUserReg = validateUserReg;
var validateUserLogin = [(0, _expressValidator.check)('CORREO').exists().isEmail(), (0, _expressValidator.check)('CONTRASENA').exists().isLength({
  min: 8
}), function (req, res, next) {
  (0, _middlewareValidates.validateResults)(req, res, next);
}];
exports.validateUserLogin = validateUserLogin;