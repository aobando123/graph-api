"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
const path_1 = __importDefault(require("path"));
const index = (req, res) => {
    return res.sendFile(path_1.default.join(__dirname, '/../../dist/public', '/index.html'));
};
exports.index = index;
