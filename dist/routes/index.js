"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const main_1 = require("./main");
const map_1 = require("./map");
// User-route
const userRouter = express_1.Router();
userRouter.get("/map/shortest/:start/:destiny", map_1.getShortest);
// userRouter.get("/longest/:start/:destiny", getLongest);
userRouter.get("/map/graph/:node", map_1.getNode);
userRouter.get("/map/graph", map_1.getGraph);
// index
userRouter.get("/", main_1.index);
const baseRouter = express_1.Router();
baseRouter.use("/", userRouter);
exports.default = baseRouter;
