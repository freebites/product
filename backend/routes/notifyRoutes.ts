import express from "express";
import * as notify from "../controllers/notifyControllers";
/*
 * postRoutes.ts
 *
 * purpose: defines and exports the routes for interacting with the post
 * 			database.
 *
 * takes in controller functions to execute at those endpoints, defined in
 * controllers/postControllers
 *
 */
const notifyRouter = express.Router();

notifyRouter.post("/api/notify", notify.notifyUsers);

export default notifyRouter;
