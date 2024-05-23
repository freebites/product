import express from "express";
import * as notify from "../controllers/notifyControllers";

const notifyRouter = express.Router();

notifyRouter.post("/api/notify", notify.notifyUsers);

export default notifyRouter;
