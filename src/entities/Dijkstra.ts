import HashTable from "./HashTable";
import GraphPath from "./Path";
import Vertex from "./Vertex";

export default class Dijkstra {
  private vertices: HashTable<Vertex>;
  constructor(vertices: HashTable<Vertex>) {
    this.vertices = vertices;
  }

  private findPointsOfShortestWay(start: string, finish: string): string[] {
    let nextVertex: string = finish;
    const arrayWithVertex: string[] = [];
    while (nextVertex !== start) {
      let minWeigth: number = Number.MAX_VALUE;
      let minVertex = "";
      for (const neighbour of this.vertices.get(nextVertex)!.nodes) {
        if (
          neighbour.weight + this.vertices.get(neighbour.nameOfVertex)!.weight <
          minWeigth
        ) {
          minWeigth = this.vertices.get(neighbour.nameOfVertex)!.weight;
          minVertex = neighbour.nameOfVertex;
        }
      }
      arrayWithVertex.push(minVertex);
      nextVertex = minVertex;
    }
    return arrayWithVertex;
  }
  private findPointsOfLongestWay(start: string, finish: string): string[] {
    let nextVertex: string = finish;
    const arrayWithVertex: string[] = [];
    while (nextVertex !== start) {
      let minWeigth: number = Number.MAX_VALUE;
      let minVertex = "";
      for (const neighbour of this.vertices.get(nextVertex)!.nodes) {
        const weight =
          (neighbour.weight +
            this.vertices.get(neighbour.nameOfVertex)!.weight) *
          -1;

        console.log(neighbour.nameOfVertex, weight);
        console.log("minWeigth", minWeigth);
        if (weight < minWeigth) {
          minWeigth = this.vertices.get(neighbour.nameOfVertex)!.weight * -1;
          minVertex = neighbour.nameOfVertex;
        }
      }
      console.log("minimo", minVertex, minWeigth);
      arrayWithVertex.push(minVertex);
      nextVertex = minVertex;
    }
    return arrayWithVertex;
  }

  private setupStartNode(start: string): any {
    const nodes: any = {};

    this.vertices.getEntries().forEach((entry) => {
      if (entry.name === start) {
        entry.weight = 0;
      } else {
        entry.weight = Number.MAX_VALUE;
      }

      nodes[entry.name] = entry.weight;
      this.vertices.put(entry.name, entry);
    });
    return nodes;
  }

  private setPathsWeight(nodes: any) {
    while (Object.keys(nodes).length !== 0) {
      //Let get the smallest node based on weight
      const sortedVisitedByWeight: string = Object.keys(nodes).sort(
        (a, b) => this.vertices.get(a)!.weight - this.vertices.get(b)!.weight
      )[0];

      const currentVertex: Vertex = this.vertices.get(sortedVisitedByWeight)!;
      //Add the node weight to its neighbors
      for (const j of currentVertex.nodes) {
        const calculateWeight: number = currentVertex.weight + j.weight;
        const vertex = this.vertices.get(j.nameOfVertex)!;
        console.log(j.nameOfVertex);
        if (calculateWeight < vertex.weight) {
          vertex!.weight = calculateWeight;
          this.vertices.put(vertex.name, vertex);
        }
      }
      //remove the node from the search list
      delete nodes[sortedVisitedByWeight];
    }
  }

  findShortestWay(start: string, finish: string) {
    const nodes: any = this.setupStartNode(start);
    this.setPathsWeight(nodes);

    const finishWeight: number = this.vertices.get(finish)!.weight;
    const arrayWithVertex: string[] = this.findPointsOfShortestWay(
      start,
      finish
    ).reverse();
    arrayWithVertex.push(finish);
    return new GraphPath(arrayWithVertex, finishWeight.toString());
  }

  findLongestWay(start: string, finish: string) {
    const nodes: any = this.setupStartNode(start);
    this.setPathsWeight(nodes);

    const finishWeight: number = this.vertices.get(finish)!.weight;
    const arrayWithVertex: string[] = this.findPointsOfLongestWay(
      start,
      finish
    ).reverse();
    arrayWithVertex.push(finish);
    const path = {
      path: arrayWithVertex,
      totalWeight: finishWeight.toString(),
    };
    return path;
  }
}
