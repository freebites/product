import { Request, Response } from "express";

import Item from "../models/postModel";
import { postType } from "../../types/PostTypes";
import { Error } from "mongoose";

/*
 * postController.ts
 * functions that define the CRUD operations for the Posts database
 * authors: @jzhang43 @johnny-t06
 * @LordofMankid just refactored this
 */

/**
 * @description Get all posts from the database.
 * @route GET /api/Posts
 */
const getAllPosts = async (req: Request, res: Response) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

/**
 * @description Get all posts from the database.
 * @route GET /api/Posts/:id
 * @param {string} id - The mongoDB _id of the post
 */
const getOnePost = async (req: Request, res: Response) => {
  const itemId = req.params.id;

  try {
    const item = await Item.findOne({ _id: itemId });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Something went hi" });
  }
};

interface CreatePostRequest extends Request {
  body: postType;
}
/**
 * @description Get all posts from the database.
 * @route GET /api/Posts/:id
 * @param { postType } post - should be of type postType, adhering to 'ItemSchema'
 */
const getPostsWithFilter = async (req: Request, res: Response) => {
  // yoinks the query params like .../Posts?keyword=apple&location=store
  // it'll get keyword = apple, location = store

  try {
    const query = req.query;
    const sortBy = query.sort;

    const sortParams = {
      [String(sortBy)]: 1,
    }; // add .sort(sortParams)
    let filters;
    let items;
    if (query.userID) {
      items = await Item.find({ postedBy: query.userID });
    } else {
      filters = buildPostQueryConditions(query);
      items = await Item.find(filters);
    }

    res.json(items);
  } catch (error: any) {
    const simpleError = {
      message: error.message,
      stack: error.stack,
      // You can manually copy other properties if necessary and safe
    };
    res.status(500).json({ error: "Internal server error" });
  }
};

// interface defining type for query (for building the filter query)
interface PostQueryConditions {
  // all fields are optional to account for no filter applied
  "tags.diet"?: {
    $all: string[]; // array of dietary restrictions
  };
  "tags.perishable"?: {
    $in: string; // perishable
  };
  "location.location.coordinates"?: {
    // weird shit
    $near: {
      $geometry: {
        type: "Point";
        coordinates: [number, number];
      };
      $maxDistance: number;
    };
  };
}

// Function to build post query based on provided filters into mongoDB query
function buildPostQueryConditions(filters: {
  diet?: string[];
  perishable?: string;
  latitude?: string;
  longitude?: string;
  maxDistance?: string;
}) {
  // empty conditions by default
  const conditions: PostQueryConditions = {};
  // checks for tag filter
  if (filters.diet) {
    // can further optimize by only searching in tags field, but would need sep
    conditions["tags.diet"] = { $all: filters.diet };
  }

  if (filters.perishable) {
    conditions["tags.perishable"] = { $in: filters.perishable };
  }
  // turns the lat/long coordinate [x, y] into mongoDB geospatial query params
  if (filters.latitude && filters.longitude) {
    // default to 5km radius if maxDistance isn't applied
    const longitude = filters.longitude;
    const latitude = filters.latitude;
    const maxDistance = filters.maxDistance
      ? parseInt(filters.maxDistance)
      : 5000;
    conditions["location.location.coordinates"] = {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [parseFloat(longitude), parseFloat(latitude)],
        },
        $maxDistance: maxDistance,
      },
    };
  }

  return conditions;
}

const createPost = async (req: CreatePostRequest, res: Response) => {
  const post = req.body; // should be the same as the posts schema

  try {
    const savedItem = await Item.create(post);
    res.json(savedItem);
  } catch (error) {
    console.log("Error creating review document", error);
  }
};

/**
 * @description updates a post in the database.
 * @route GET /api/Posts/:id
 * @param { string } id - the mongoDB _id of the post
 * @param { Object } updatedData - the data to update in the post
 * @returns { Object }
 */
const updatePost = async (req: Request, res: Response) => {
  try {
    const itemId = req.params.id;
    const updatedData = req.body;

    // Find the item by ID and update its properties
    const updatedItem = await Item.findByIdAndUpdate(itemId, updatedData, {
      new: true,
    });

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(updatedItem);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

/**
 * @description delete post from the database
 * @route GET /api/Posts/:id
 * @param { string } id - the mongoDB _id of the post
 */
const deletePost = async (req: Request, res: Response) => {
  try {
    const itemId = req.params.id;

    // Find the item by ID and remove it
    const deletedItem = await Item.findByIdAndDelete(itemId);

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).send("Internal Server Error");
  }
};

// export these functions and put them into the routes
export {
  getAllPosts,
  getOnePost,
  getPostsWithFilter,
  updatePost,
  createPost,
  deletePost,
};
