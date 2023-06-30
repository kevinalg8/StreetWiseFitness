"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _ejs = _interopRequireDefault(require("ejs"));
var _path = _interopRequireDefault(require("path"));
var url = _interopRequireWildcard(require("url"));
var _loginRoutes = _interopRequireDefault(require("./routes/login.routes.js"));
var _inicioRoutes = _interopRequireDefault(require("./routes/inicio.routes.js"));
var _adminRoutes = _interopRequireDefault(require("./routes/admin.routes.js"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dotenv["default"].config();
var app = (0, _express["default"])();
//const __filename = url.fileURLToPath(import.meta.url);
//const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
var _dirname = _path["default"].resolve();
app.set("port", process.env.PORT || 9999);
//app.set("views", path.join(__dirname, "views"));
app.set("views", _path["default"].resolve(_path["default"].join(_dirname, "app", "views")));
console.log("views", _path["default"].resolve(_path["default"].join(_dirname, "app", "views")));
app.set("view engine", "ejs");
app.use(_express["default"].json());
app.use(_express["default"]["static"](_dirname + '/public'));
//Ensayar quitar
app.use((0, _cookieParser["default"])());
//app.use(middleware())
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use("/", _loginRoutes["default"]);
app.use("/admin", _adminRoutes["default"]);
app.use("/inicio", _inicioRoutes["default"]);
var _default = app;
exports["default"] = _default;