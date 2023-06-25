"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateToken = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var validateToken = function validateToken(req, res, next) {
  if (req.cookies.SWF) {
    try {
      var token = _jsonwebtoken["default"].verify(req.cookies.SWF, process.env.SECRET_KEY);
      next();
    } catch (error) {
      console.log(error);
      //res.redirect("registroUsuario")     
    }
  } else {
    res.redirect("/registroUsuario");
  }
};
exports.validateToken = validateToken;