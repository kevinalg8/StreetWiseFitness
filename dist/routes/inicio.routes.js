"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var controllerProds = _interopRequireWildcard(require("../controllers/controller.productos.js"));
var controllers = _interopRequireWildcard(require("../controllers/controller.usuarios.js"));
var planControllers = _interopRequireWildcard(require("../controllers/controller.planes.js"));
var planRecetas = _interopRequireWildcard(require("../controllers/controller.recetas.js"));
var _middleware = require("../middlewares/middleware.js");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var inicio = (0, _express.Router)();
inicio.get('/', function (req, res) {
  res.render("inicio", {
    "rol": 0
  });
});
inicio.get('/productos', _middleware.validateToken, controllerProds.getProductos);
inicio.get('/trenInferior', _middleware.validateToken, controllerProds.getProdinf);
inicio.get('/trenSuperior', _middleware.validateToken, controllerProds.getProdsup);
inicio.get('/plangeneral', _middleware.validateToken, controllerProds.getProdgen);
inicio.get('/recetas', _middleware.validateToken, planRecetas.getRecetaUser);
inicio.get('/createPlan', _middleware.validateToken, planControllers.getAllplanes);
inicio.post('/guardarPlan', _middleware.validateToken, planControllers.createPlanes);
inicio.post('/guardarReceta', _middleware.validateToken, planRecetas.crearReceta);
inicio.get('/cerrarSesion', controllers.cerrarSesion);
var _default = inicio;
exports["default"] = _default;