import { Router } from "express";

import { getShortest, getGraph, getNode } from "./map";

// User-route
const userRouter = Router();
userRouter.get("/shortest/:start/:destiny", getShortest);
// userRouter.get("/longest/:start/:destiny", getLongest);
userRouter.get("/graph/:node", getNode);
userRouter.get("/graph", getGraph);

// index
router.get("/", index);

const baseRouter = Router();
baseRouter.use("/", router);
export default baseRouter;
