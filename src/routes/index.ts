import { Router } from "express";
import { index } from "./main";
import { getShortest, getGraph, getNode } from "./map";

// User-route
const userRouter = Router();
userRouter.get("/map/shortest/:start/:destiny", getShortest);
// userRouter.get("/longest/:start/:destiny", getLongest);
userRouter.get("/map/graph/:node", getNode);
userRouter.get("/map/graph", getGraph);
// index
userRouter.get("/", index);

const baseRouter = Router();
baseRouter.use("/", userRouter);
export default baseRouter;
