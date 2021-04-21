"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Path_1 = __importDefault(require("./Path"));
class Dijkstra {
    constructor(vertices) {
        this.vertices = vertices;
    }
    findPointsOfShortestWay(start, finish) {
        let nextVertex = finish;
        const arrayWithVertex = [];
        while (nextVertex !== start) {
            let minWeigth = Number.MAX_VALUE;
            let minVertex = "";
            for (const neighbour of this.vertices.get(nextVertex).nodes) {
                if (neighbour.weight + this.vertices.get(neighbour.nameOfVertex).weight <
                    minWeigth) {
                    minWeigth = this.vertices.get(neighbour.nameOfVertex).weight;
                    minVertex = neighbour.nameOfVertex;
                }
            }
            arrayWithVertex.push(minVertex);
            nextVertex = minVertex;
        }
        return arrayWithVertex;
    }
    findPointsOfLongestWay(start, finish) {
        let nextVertex = finish;
        const arrayWithVertex = [];
        while (nextVertex !== start) {
            let minWeigth = Number.MAX_VALUE;
            let minVertex = "";
            for (const neighbour of this.vertices.get(nextVertex).nodes) {
                const weight = (neighbour.weight +
                    this.vertices.get(neighbour.nameOfVertex).weight) *
                    -1;
                console.log(neighbour.nameOfVertex, weight);
                console.log("minWeigth", minWeigth);
                if (weight < minWeigth) {
                    minWeigth = this.vertices.get(neighbour.nameOfVertex).weight * -1;
                    minVertex = neighbour.nameOfVertex;
                }
            }
            console.log("minimo", minVertex, minWeigth);
            arrayWithVertex.push(minVertex);
            nextVertex = minVertex;
        }
        return arrayWithVertex;
    }
    setupStartNode(start) {
        const nodes = {};
        this.vertices.getEntries().forEach((entry) => {
            if (entry.name === start) {
                entry.weight = 0;
            }
            else {
                entry.weight = Number.MAX_VALUE;
            }
            nodes[entry.name] = entry.weight;
            this.vertices.put(entry.name, entry);
        });
        return nodes;
    }
    setPathsWeight(nodes) {
        while (Object.keys(nodes).length !== 0) {
            //Let get the smallest node based on weight
            const sortedVisitedByWeight = Object.keys(nodes).sort((a, b) => this.vertices.get(a).weight - this.vertices.get(b).weight)[0];
            const currentVertex = this.vertices.get(sortedVisitedByWeight);
            //Add the node weight to its neighbors
            for (const j of currentVertex.nodes) {
                const calculateWeight = currentVertex.weight + j.weight;
                const vertex = this.vertices.get(j.nameOfVertex);
                console.log(j.nameOfVertex);
                if (calculateWeight < vertex.weight) {
                    vertex.weight = calculateWeight;
                    this.vertices.put(vertex.name, vertex);
                }
            }
            //remove the node from the search list
            delete nodes[sortedVisitedByWeight];
        }
    }
    findShortestWay(start, finish) {
        const nodes = this.setupStartNode(start);
        this.setPathsWeight(nodes);
        const finishWeight = this.vertices.get(finish).weight;
        const arrayWithVertex = this.findPointsOfShortestWay(start, finish).reverse();
        arrayWithVertex.push(finish);
        return new Path_1.default(arrayWithVertex, finishWeight.toString());
    }
    findLongestWay(start, finish) {
        const nodes = this.setupStartNode(start);
        this.setPathsWeight(nodes);
        const finishWeight = this.vertices.get(finish).weight;
        const arrayWithVertex = this.findPointsOfLongestWay(start, finish).reverse();
        arrayWithVertex.push(finish);
        const path = {
            path: arrayWithVertex,
            totalWeight: finishWeight.toString(),
        };
        return path;
    }
}
exports.default = Dijkstra;
