"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateResults = void 0;
var _expressValidator = require("express-validator");
var validateResults = function validateResults(req, res, next) {
  try {
    (0, _expressValidator.validationResult)(req)["throw"]();
    next();
  } catch (error) {
    res.redirect("/?error=1");
    console.log(error);
  }
};
exports.validateResults = validateResults;