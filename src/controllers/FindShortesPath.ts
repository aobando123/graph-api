import MapGraph from "@entities/MapGraph";
import Vertex from "../entities/Vertex";

class MapGraphController {
  private mapGraph: MapGraph;
  constructor() {
    this.mapGraph = new MapGraph();
    this.init();
  }

  private init() {
    this.mapGraph.addVertex(
      new Vertex(
        "San_Jose",
        [
          { nameOfVertex: "Tibas", weight: 3.74 },
          { nameOfVertex: "Goicoechea", weight: 9.9 },
          { nameOfVertex: "Montes_de_Oca", weight: 9.1 },
          { nameOfVertex: "Curridabat", weight: 7 },
          { nameOfVertex: "Escazu", weight: 7.9 },
          { nameOfVertex: "Santa_Ana", weight: 14.6 },
          { nameOfVertex: "Alajuelita", weight: 3.6 },
          { nameOfVertex: "Desamparados", weight: 6.9 },
        ],
        1
      )
    );
    this.mapGraph.addVertex(
      new Vertex(
        "Escazu",
        [
          { nameOfVertex: "San_Jose", weight: 7.9 },
          { nameOfVertex: "Santa_Ana", weight: 5.3 },
          { nameOfVertex: "Alajuelita", weight: 6.8 },
        ],
        1
      )
    );
    this.mapGraph.addVertex(
      new Vertex(
        "Desamparados",
        [
          { nameOfVertex: "Alajuelita", weight: 5.5 },
          { nameOfVertex: "Aserri", weight: 5.6 },
          { nameOfVertex: "Leon_Cortes", weight: 7.5 },
          { nameOfVertex: "Dota", weight: 51.5 },
          { nameOfVertex: "Curridabat", weight: 4.6 },
        ],
        1
      )
    );
    this.mapGraph.addVertex(
      new Vertex(
        "Puriscal",
        [
          { nameOfVertex: "Mora", weight: 24 },
          { nameOfVertex: "Acosta", weight: 32.8 },
          { nameOfVertex: "Turrubares", weight: 22.7 },
          { nameOfVertex: "Parrita", weight: 65.2 },
        ],
        1
      )
    );
    this.mapGraph.addVertex(
      new Vertex(
        "Tarrazu",
        [
          { nameOfVertex: "Leon_Cortes", weight: 12.9 },
          { nameOfVertex: "Dota", weight: 27.8 },
          { nameOfVertex: "Perez_Zeledon", weight: 126.9 },
        ],
        1
      )
    );
    this.mapGraph.addVertex(
      new Vertex(
        "Aserri",
        [
          { nameOfVertex: "Alajuelita", weight: 5.9 },
          { nameOfVertex: "Acosta", weight: 19.5 },
          { nameOfVertex: "Leon_Cortes", weight: 39.3 },
          { nameOfVertex: "Desamparados", weight: 5.6 },
        ],
        1
      )
    );
    this.mapGraph.addVertex(
      new Vertex(
        "Mora",
        [
          { nameOfVertex: "Puriscal", weight: 24 },
          { nameOfVertex: "Acosta", weight: 30.9 },
          { nameOfVertex: "Santa_Ana", weight: 9.6 },
          { nameOfVertex: "Turrubares", weight: 41.9 },
          { nameOfVertex: "Atenas", weight: 24.2 },
        ],
        1
      )
    );
    this.mapGraph.addVertex(
      new Vertex(
        "Goicoechea",
        [
          { nameOfVertex: "Vazquez_de_Coronado", weight: 10.3 },
          { nameOfVertex: "Montes_de_Oca", weight: 2.9 },
          { nameOfVertex: "Moravia", weight: 10.8 },
          { nameOfVertex: "San_Jose", weight: 9.9 },
          { nameOfVertex: "Tibas", weight: 8.3 },
        ],
        1
      )
    );
    this.mapGraph.addVertex(
      new Vertex(
        "Santa_Ana",
        [
          { nameOfVertex: "San_Jose", weight: 14.6 },
          { nameOfVertex: "Escazu", weight: 5.3 },
          { nameOfVertex: "Mora", weight: 9.5 },
          { nameOfVertex: "Acosta", weight: 42 },
        ],
        1
      )
    );
    this.mapGraph.addVertex(
      new Vertex(
        "Alajuelita",
        [
          { nameOfVertex: "San_Jose", weight: 3.6 },
          { nameOfVertex: "Escazu", weight: 6.8 },
          { nameOfVertex: "Desamparados", weight: 5.5 },
          { nameOfVertex: "Aserri", weight: 6 },
          { nameOfVertex: "Acosta", weight: 25.4 },
        ],
        1
      )
    );
    this.mapGraph.addVertex(
      new Vertex(
        "Vazquez_de_Coronado",
        [
          { nameOfVertex: "Moravia", weight: 9.2 },
          { nameOfVertex: "Goicoechea", weight: 10.4 },
        ],
        1
      )
    );
    this.mapGraph.addVertex(
      new Vertex(
        "Acosta",
        [
          { nameOfVertex: "Parrita", weight: 57.4 },
          { nameOfVertex: "Puriscal", weight: 32.8 },
          { nameOfVertex: "Aserri", weight: 19.5 },
          { nameOfVertex: "Alajuelita", weight: 25.4 },
          { nameOfVertex: "Santa_Ana", weight: 42 },
          { nameOfVertex: "Mora", weight: 9.6 },
        ],
        1
      )
    );
    this.mapGraph.addVertex(
      new Vertex(
        "Tibas",
        [
          { nameOfVertex: "Moravia", weight: 11.8 },
          { nameOfVertex: "San_Jose", weight: 3.74 },
          { nameOfVertex: "Goicoechea", weight: 8.3 },
        ],
        1
      )
    );
    this.mapGraph.addVertex(
      new Vertex(
        "Moravia",
        [
          { nameOfVertex: "Goicoechea", weight: 10.8 },
          { nameOfVertex: "Tibas", weight: 8.3 },
          { nameOfVertex: "Vazquez_de_Coronado", weight: 9.2 },
        ],
        1
      )
    );
    this.mapGraph.addVertex(
      new Vertex(
        "Montes_de_Oca",
        [
          { nameOfVertex: "San_Jose", weight: 9.1 },
          { nameOfVertex: "Goicoechea", weight: 2.9 },
          { nameOfVertex: "Curridabat", weight: 5.1 },
        ],
        1
      )
    );
    this.mapGraph.addVertex(
      new Vertex(
        "Turrubares",
        [
          { nameOfVertex: "Mora", weight: 41.9 },
          { nameOfVertex: "Puriscal", weight: 22.7 },
          { nameOfVertex: "Garabito", weight: 48.9 },
          { nameOfVertex: "Parrita", weight: 104.8 },
          { nameOfVertex: "Orotina", weight: 21 },
        ],
        1
      )
    );
    this.mapGraph.addVertex(
      new Vertex(
        "Dota",
        [
          { nameOfVertex: "Desamparados", weight: 41.9 },
          { nameOfVertex: "Tarrazu", weight: 22.7 },
          { nameOfVertex: "Perez_Zeledon", weight: 111.5 },
        ],
        1
      )
    );
    this.mapGraph.addVertex(
      new Vertex(
        "Curridabat",
        [
          { nameOfVertex: "San_Jose", weight: 7 },
          { nameOfVertex: "Montes_de_Oca", weight: 5.1 },
          { nameOfVertex: "Desamparados", weight: 4.6 },
        ],
        1
      )
    );
    this.mapGraph.addVertex(
      new Vertex(
        "Perez_Zeledon",
        [
          { nameOfVertex: "Tarrazu", weight: 126.9 },
          { nameOfVertex: "Montes_de_Oca", weight: 111.5 },
        ],
        1
      )
    );
    this.mapGraph.addVertex(
      new Vertex(
        "Leon_Cortes",
        [
          { nameOfVertex: "Tarrazu", weight: 12.9 },
          { nameOfVertex: "Desamparados", weight: 7.5 },
          { nameOfVertex: "Aserri", weight: 39.3 },
        ],
        1
      )
    );
    this.mapGraph.addVertex(
      new Vertex(
        "Garabito",
        [
          { nameOfVertex: "Orotina", weight: 28.8 },
          { nameOfVertex: "Esparza", weight: 49.1 },
          { nameOfVertex: "Parrita", weight: 56.6 },
          { nameOfVertex: "Turrubares", weight: 48.9 },
        ],
        1
      )
    );
    this.mapGraph.addVertex(
      new Vertex(
        "Parrita",
        [
          { nameOfVertex: "Acosta", weight: 57.4 },
          { nameOfVertex: "Puriscal", weight: 65.2 },
          { nameOfVertex: "Garabito", weight: 56.6 },
          { nameOfVertex: "Turrubares", weight: 104.8 },
        ],
        1
      )
    );
    this.mapGraph.addVertex(
      new Vertex(
        "Orotina",
        [
          { nameOfVertex: "Esparza", weight: 24.1 },
          { nameOfVertex: "Atenas", weight: 25 },
          { nameOfVertex: "Garabito", weight: 28.8 },
          { nameOfVertex: "Turrubares", weight: 21 },
        ],
        1
      )
    );
    this.mapGraph.addVertex(
      new Vertex(
        "Esparza",
        [
          { nameOfVertex: "Orotina", weight: 24.1 },
          { nameOfVertex: "Garabito", weight: 49.1 },
        ],
        1
      )
    );
    this.mapGraph.addVertex(
      new Vertex(
        "Atenas",
        [
          { nameOfVertex: "Orotina", weight: 25 },
          { nameOfVertex: "Mora", weight: 24.2 },
        ],
        1
      )
    );
  }

  getShortestPath(start: string, finish: string) {
    return this.mapGraph.getShortestPath(start, finish);
  }
  // findLongestPath(start: string, finish: string) {
  //   return this.mapGraph.findLongestWay(start, finish);
  // }

  getGraph() {
    return this.mapGraph.getGraph();
  }
  getNode(node: string) {
    return this.mapGraph.getNode(node);
  }
}
const mapGraphController = new MapGraphController();

export default mapGraphController;
