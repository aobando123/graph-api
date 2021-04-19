"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGraph = exports.getShortest = void 0;
const FindShortesPath_1 = __importDefault(require("../controllers/FindShortesPath"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const { BAD_REQUEST, CREATED, OK } = http_status_codes_1.default;
const getShortest = (req, res) => {
    const { params } = req;
    const graph = FindShortesPath_1.default.findShortestWay(params.start, params.destiny);
    return res.status(OK).json(graph);
};
exports.getShortest = getShortest;
const getGraph = (req, res) => {
    const graph = FindShortesPath_1.default.vertices;
    const listGraph = [];
    Object.entries(graph).forEach(([name, vertice]) => {
        listGraph.push(vertice);
    });
    return res.status(OK).json(listGraph);
};
exports.getGraph = getGraph;
