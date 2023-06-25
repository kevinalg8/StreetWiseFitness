"use strict";

var _app = _interopRequireDefault(require("./app.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_app["default"].listen(_app["default"].get("port"), function () {
  console.log("Se ha conectado al puerto ".concat(_app["default"].get("port"), "\n    http://localhost:").concat(_app["default"].get("port")));
});