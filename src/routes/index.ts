import { Router } from "express";

import getShortest from "./map";

// User-route
const userRouter = Router();
userRouter.get("/shortest", getShortest);

// Export the base-router
const baseRouter = Router();
baseRouter.use("/map", userRouter);
export default baseRouter;
