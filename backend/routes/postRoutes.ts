import express from "express";
import * as post from "../controllers/postControllers";
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
const postRouter = express.Router();

postRouter.get("/api/Posts", post.getAllPosts);

postRouter.get("/api/Posts/:id", post.getOnePost);

postRouter.post("/api/Posts", post.createPost);

postRouter.put("/api/Posts/:id", post.updatePost);

postRouter.delete("/api/Posts/:id", post.deletePost);

export default postRouter;
