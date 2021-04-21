"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNode = exports.getGraph = exports.getShortest = void 0;
const FindShortesPath_1 = __importDefault(require("../controllers/FindShortesPath"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const { BAD_REQUEST, CREATED, OK } = http_status_codes_1.default;
const getShortest = (req, res) => {
    const { params } = req;
    const graph = FindShortesPath_1.default.getShortestPath(params.start, params.destiny);
    return res.status(OK).json(graph);
};
exports.getShortest = getShortest;
// const getLongest = (req: Request, res: Response) => {
//   const { params } = req;
//   const graph = dijkstra.findLongestPath(params.start, params.destiny);
//   return res.status(OK).json(graph);
// };
const getGraph = (req, res) => {
    const graph = FindShortesPath_1.default.getGraph();
    return res.status(OK).json(graph);
};
exports.getGraph = getGraph;
const getNode = (req, res) => {
    const { params } = req;
    const graph = FindShortesPath_1.default.getNode(params.node);
    return res.status(OK).json(graph);
};
exports.getNode = getNode;
