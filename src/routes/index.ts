import { Router } from "express";

import { getShortest, getGraph } from "./map";

// User-route
const userRouter = Router();
userRouter.get("/shortest/:start/:destiny", getShortest);
userRouter.get("/graph", getGraph);

// Export the base-router
const baseRouter = Router();
baseRouter.use("/map", userRouter);
export default baseRouter;
