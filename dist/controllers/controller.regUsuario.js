"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertUsuario = void 0;
var _nodeFetch = _interopRequireDefault(require("node-fetch"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var insertUsuario = function insertUsuario(req, res) {
  if (req.body.COD_ROL === "Usuario") {
    var data = {
      NOMBRES: req.body.NOMBRES,
      APELLIDOS: req.body.APELLIDOS,
      CORREO: req.body.CORREO,
      CELULAR: req.body.CELULAR,
      FECHA_NACIMIENTO: req.body.FECHA_NACIMIENTO,
      CONTRASENA: req.body.CONTRASENA,
      COD_ROL: 1
    };
    var metodo = "POST";
    var url = process.env.API_URL + '/users';
    var option = {
      method: metodo,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    try {
      var respuesta = (0, _nodeFetch["default"])(url, option).then(function (response) {
        return response.json();
      }).then(function (data) {
        return (
          //data:data
          console.log("Usuario creado")
        );
      })["catch"](function (err) {
        return console.log("Error: ".concat(err));
      });
    } catch (error) {
      console.log("error en ".concat(error));
    }
    res.redirect("/");
  } else {
    var _data = {
      NOMBRES: req.body.NOMBRES,
      APELLIDOS: req.body.APELLIDOS,
      CORREO: req.body.CORREO,
      CELULAR: req.body.CELULAR,
      FECHA_NACIMIENTO: req.body.FECHA_NACIMIENTO,
      CONTRASENA: req.body.CONTRASENA,
      COD_ROL: 2
    };
    console.log(_data);
    var _metodo = "POST";
    var _url = process.env.API_URL + '/users';
    var _option = {
      method: _metodo,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(_data)
    };
    try {
      var _respuesta = (0, _nodeFetch["default"])(_url, _option).then(function (response) {
        return response.json();
      }).then(function (data) {
        return (
          //data:data
          console.log("Entrenador creado")
        );
      })["catch"](function (err) {
        return console.log("Error: ".concat(err));
      });
    } catch (error) {
      console.log("error en ".concat(error));
    }
    res.redirect("/");
  }
};
exports.insertUsuario = insertUsuario;