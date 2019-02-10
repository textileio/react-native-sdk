"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CameraRoll_1 = require("./CameraRoll");
exports.CameraRoll = CameraRoll_1.default;
var react_native_protobufs_1 = require("@textile/react-native-protobufs");
exports.Protobufs = react_native_protobufs_1.default;
const API = __importStar(require("./Textile/API"));
exports.API = API;
const events_1 = __importDefault(require("./Textile/events"));
exports.Events = events_1.default;
const Textile_1 = __importStar(require("./Textile"));
exports.Textile = Textile_1.default;
exports.BackgroundTask = Textile_1.BackgroundTask;
__export(require("./Textile/Models"));
exports.default = new Textile_1.default({});
