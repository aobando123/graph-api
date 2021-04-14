import dijkstra from "../controllers/FindShortesPath";
import StatusCodes from "http-status-codes";
import { Request, Response } from "express";
const { BAD_REQUEST, CREATED, OK } = StatusCodes;

const getShortest = (req: Request, res: Response) => {
  const { params } = req;
  const graph = dijkstra.findShortestWay("A", "F");

  return res.status(OK).json(graph);
};

const getGraph = (req: Request, res: Response) => {
  const { params } = req;
  const graph = dijkstra.vertices;

  return res.status(OK).json(graph);
};

export default getShortest;
