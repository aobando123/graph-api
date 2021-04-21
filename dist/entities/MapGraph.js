"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Dijkstra_1 = __importDefault(require("./Dijkstra"));
const HashTable_1 = __importDefault(require("./HashTable"));
class MaphGraph {
    constructor() {
        this.graph = new HashTable_1.default(25);
        this.dijsktra = new Dijkstra_1.default(this.graph);
    }
    addVertex(vertex) {
        this.graph.put(vertex.name, vertex);
    }
    getNode(node) {
        return this.graph.get(node);
    }
    getGraph() {
        return this.graph.getEntries();
    }
    getShortestPath(start, finish) {
        return this.dijsktra.findShortestWay(start, finish);
    }
}
exports.default = MaphGraph;
