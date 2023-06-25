"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateToken = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var validateToken = function validateToken(req, res, next) {
  try {
    var token = _jsonwebtoken["default"].verify(req.cookies.SWF, process.env.SECRET_KEY);
    if (token) {
      //console.log(req.cookies);
      next();
    } else {
      res.redirect("registroUsuario");
    }
  } catch (error) {
    console.log(error);
  }
};
exports.validateToken = validateToken;