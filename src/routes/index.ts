import { Router } from "express";
import { getShortest, getGraph } from "./map";
import { index } from "./main";

const router = Router();

// map api
router.get("/map/shortest/:start/:destiny", getShortest);
router.get("/map/graph", getGraph);

// index
router.get("/", index);

const baseRouter = Router();
baseRouter.use("/", router);
export default baseRouter;
