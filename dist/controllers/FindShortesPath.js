"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vertex_1 = __importDefault(require("../entities/Vertex"));
class Dijkstra {
    constructor() {
        this.vertices = {};
    }
    addVertex(vertex) {
        this.vertices[vertex.name] = vertex;
    }
    findPointsOfShortestWay(start, finish, weight) {
        let nextVertex = finish;
        const arrayWithVertex = [];
        while (nextVertex !== start) {
            let minWeigth = Number.MAX_VALUE;
            let minVertex = "";
            for (const i of this.vertices[nextVertex].nodes) {
                if (i.weight + this.vertices[i.nameOfVertex].weight < minWeigth) {
                    minWeigth = this.vertices[i.nameOfVertex].weight;
                    minVertex = i.nameOfVertex;
                }
            }
            arrayWithVertex.push(minVertex);
            nextVertex = minVertex;
        }
        return arrayWithVertex;
    }
    findShortestWay(start, finish) {
        const nodes = {};
        const visitedVertex = [];
        for (const i in this.vertices) {
            if (this.vertices[i].name === start) {
                this.vertices[i].weight = 0;
            }
            else {
                this.vertices[i].weight = Number.MAX_VALUE;
            }
            nodes[this.vertices[i].name] = this.vertices[i].weight;
        }
        while (Object.keys(nodes).length !== 0) {
            const sortedVisitedByWeight = Object.keys(nodes).sort((a, b) => this.vertices[a].weight - this.vertices[b].weight);
            const currentVertex = this.vertices[sortedVisitedByWeight[0]];
            for (const j of currentVertex.nodes) {
                const calculateWeight = currentVertex.weight + j.weight;
                if (calculateWeight < this.vertices[j.nameOfVertex].weight) {
                    this.vertices[j.nameOfVertex].weight = calculateWeight;
                }
            }
            delete nodes[sortedVisitedByWeight[0]];
        }
        const finishWeight = this.vertices[finish].weight;
        const arrayWithVertex = this.findPointsOfShortestWay(start, finish, finishWeight).reverse();
        arrayWithVertex.push(finish, finishWeight.toString());
        return arrayWithVertex;
    }
}
const dijkstra = new Dijkstra();
dijkstra.addVertex(new Vertex_1.default("A", [
    { nameOfVertex: "C", weight: 3 },
    { nameOfVertex: "E", weight: 7 },
    { nameOfVertex: "B", weight: 4 },
], 1));
dijkstra.addVertex(new Vertex_1.default("B", [
    { nameOfVertex: "A", weight: 4 },
    { nameOfVertex: "C", weight: 6 },
    { nameOfVertex: "D", weight: 5 },
], 1));
dijkstra.addVertex(new Vertex_1.default("C", [
    { nameOfVertex: "A", weight: 3 },
    { nameOfVertex: "B", weight: 6 },
    { nameOfVertex: "E", weight: 8 },
    { nameOfVertex: "D", weight: 11 },
], 1));
dijkstra.addVertex(new Vertex_1.default("D", [
    { nameOfVertex: "B", weight: 5 },
    { nameOfVertex: "C", weight: 11 },
    { nameOfVertex: "E", weight: 2 },
    { nameOfVertex: "F", weight: 2 },
], 1));
dijkstra.addVertex(new Vertex_1.default("E", [
    { nameOfVertex: "A", weight: 7 },
    { nameOfVertex: "C", weight: 8 },
    { nameOfVertex: "D", weight: 2 },
    { nameOfVertex: "G", weight: 5 },
], 1));
dijkstra.addVertex(new Vertex_1.default("F", [
    { nameOfVertex: "D", weight: 2 },
    { nameOfVertex: "G", weight: 3 },
], 1));
dijkstra.addVertex(new Vertex_1.default("G", [
    { nameOfVertex: "D", weight: 10 },
    { nameOfVertex: "E", weight: 5 },
    { nameOfVertex: "F", weight: 3 },
], 1));
exports.default = dijkstra;
