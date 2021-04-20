import Dijkstra from "./Dijkstra";
import HashTable from "./HashTable";
import Vertex from "./Vertex";

export default class MaphGraph {
  private graph: HashTable<Vertex>;
  private dijsktra: Dijkstra;

  constructor() {
    this.graph = new HashTable(25);
    this.dijsktra = new Dijkstra(this.graph);
  }

  addVertex(vertex: Vertex): void {
    this.graph.put(vertex.name, vertex);
  }

  getNode(node: string) {
    return this.graph.get(node);
  }

  getGraph() {
    return this.graph.getEntries();
  }

  getShortestPath(start: string, finish: string) {
    return this.dijsktra.findShortestWay(start, finish);
  }
}
