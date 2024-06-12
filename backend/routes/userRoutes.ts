import express from "express";
import * as user from "../controllers/userControllers";
/*
 * userRoutes.ts
 *
 * purpose: defines and exports the routes for interacting with the user
 * 			database.
 *
 * takes in controller functions defined in controllers/userControllers
 */
const userRouter = express.Router();

userRouter.get("/api/Users", user.getAllUsers);

userRouter.get("/api/Users/:id", user.getOneUser);

userRouter.get("/api/Users/:email", user.getOneUserEmail)

userRouter.post("/api/Users", user.createUser);

userRouter.put("/api/Users/:id", user.updateUser);

userRouter.delete("/api/Users/:id", user.deleteUser);

export default userRouter;
