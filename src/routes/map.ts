import mapGraph from "../controllers/FindShortesPath";
import StatusCodes from "http-status-codes";
import { Request, Response } from "express";
const { BAD_REQUEST, CREATED, OK } = StatusCodes;

const getShortest = (req: Request, res: Response) => {
  const { params } = req;
  const graph = mapGraph.getShortestPath(params.start, params.destiny);

  return res.status(OK).json(graph);
};

// const getLongest = (req: Request, res: Response) => {
//   const { params } = req;
//   const graph = dijkstra.findLongestPath(params.start, params.destiny);

//   return res.status(OK).json(graph);
// };

const getGraph = (req: Request, res: Response) => {
  const graph = mapGraph.getGraph();

  return res.status(OK).json(graph);
};

const getNode = (req: Request, res: Response) => {
  const { params } = req;
  const graph = mapGraph.getNode(params.node);

  return res.status(OK).json(graph);
};

export { getShortest, getGraph, getNode };
