import dijkstra from "../controllers/FindShortesPath";
import StatusCodes from "http-status-codes";
import { Request, Response } from "express";
const { BAD_REQUEST, CREATED, OK } = StatusCodes;

const getShortest = (req: Request, res: Response) => {
  const { params } = req;
  const graph = dijkstra.findShortesPath(params.start, params.destiny);

  return res.status(OK).json(graph);
};

const getLongest = (req: Request, res: Response) => {
  const { params } = req;
  const graph = dijkstra.findLongestPath(params.start, params.destiny);

  return res.status(OK).json(graph);
};

const getGraph = (req: Request, res: Response) => {
  const graph = dijkstra.getGraph();

  return res.status(OK).json(graph);
};

const getNode = (req: Request, res: Response) => {
  const { params } = req;
  const graph = dijkstra.getNode(params.node);

  return res.status(OK).json(graph);
};

export { getShortest, getGraph, getNode, getLongest };
