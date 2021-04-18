"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const map_1 = require("./map");
const main_1 = require("./main");
const router = express_1.Router();
// map api
router.get("/map/shortest/:start/:destiny", map_1.getShortest);
router.get("/map/graph", map_1.getGraph);
// index
router.get("/", main_1.index);
const baseRouter = express_1.Router();
baseRouter.use("/", router);
exports.default = baseRouter;
