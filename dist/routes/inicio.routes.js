"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var controller = _interopRequireWildcard(require("../controllers/controller.productos.js"));
var controllers = _interopRequireWildcard(require("../controllers/controller.usuarios.js"));
var planController = _interopRequireWildcard(require("../controllers/controller.planes.js"));
var _middleware = require("../middlewares/middleware.js");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var inicio = (0, _express.Router)();
inicio.get('/', function (req, res) {
  res.render("inicio");
});
inicio.get('/productos', controller.getProductos);
inicio.get('/planes', function (req, res) {
  res.render("planes");
});
inicio.get('/recetasDeLaComunidad', function (req, res) {
  res.render("recipes");
});
inicio.get('/admin', controllers.getUsuarios);
inicio.post('/disable-user', controllers.inhabilitar);
inicio.get('/admin-planes', planController.getPlanes);
var _default = inicio;
exports["default"] = _default;