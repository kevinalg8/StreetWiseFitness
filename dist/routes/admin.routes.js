"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var controllers = _interopRequireWildcard(require("../controllers/controller.usuarios.js"));
var planControllers = _interopRequireWildcard(require("../controllers/controller.planes.js"));
var recetaControllers = _interopRequireWildcard(require("../controllers/controller.recetas.js"));
var _middleware = require("../middlewares/middleware.js");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var admin = (0, _express.Router)();
admin.get('/', _middleware.validateToken, controllers.getUsuarios);

// PLANES
admin.get('/CrearPlanes', _middleware.validateToken, function (req, res) {
  res.render("createPlan");
});
admin.post('/CrearElPlan', _middleware.validateToken, planControllers.createPlanes);
admin.post('/disable-plan', _middleware.validateToken, planControllers.disablePlan);

// USUARIOS
admin.post('/disable-user', _middleware.validateToken, controllers.inhabilitar);
admin.get('/cerrarSesion', _middleware.validateToken, controllers.cerrarSesion);
admin.get('/planes', _middleware.validateToken, planControllers.getPlanes);

// RECETAS
admin.get('/receta', _middleware.validateToken, recetaControllers.getReceta);
admin.post('/disable-receta', _middleware.validateToken, recetaControllers.disableReceta);

// REPORTES RECETAS
admin.post('/generarPdfReceta', _middleware.validateToken, recetaControllers.generarPdfReceta);
admin.post('/generarExcelReceta', _middleware.validateToken, recetaControllers.generarExcelReceta);

// REPORTES USUARIO
admin.post('/generarPdf', _middleware.validateToken, controllers.generarPdf);
admin.post('/generarExcel', _middleware.validateToken, controllers.generarExcel);

// REPORTES PLAN
admin.post('/generarPdfPlan', _middleware.validateToken, planControllers.generarPdfPlan);
admin.post('/generarExcelPlan', _middleware.validateToken, planControllers.generarExcelPlan);
var _default = admin;
exports["default"] = _default;