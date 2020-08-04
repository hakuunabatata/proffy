import express from "express";
import ClassesController from "./controllers/ClassesController";
import ConnectionController from "./controllers/ConnectionController";

const classesController = new ClassesController();
const connectionController = new ConnectionController();

const routes = express.Router();

routes.post("/classes", classesController.create);
routes.get("/classes", classesController.index);
routes.post("/connections", connectionController.create);
routes.get("/connections", connectionController.index);

export default routes;
