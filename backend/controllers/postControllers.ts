import { postType } from "../../context/postContext";
import Item from "../models/postModel";

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
const getAllPosts = async (req, res) => {
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
const getOnePost = async (req, res) => {
  const itemId = req.params.id;

  try {
    const item = await Item.findOne({ _id: itemId });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Something went hi" });
  }
};

/**
 * @description Get all posts from the database.
 * @route GET /api/Posts/:id
 * @param { postType } post - should be of type postType, adhering to 'ItemSchema'
 */
const createPost = async (req, res) => {
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
const updatePost = async (req, res) => {
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
const deletePost = async (req, res) => {
  try {
    const itemId = req.params.id;

    // Find the item by ID and remove it
    const deletedItem = await Item.findByIdAndRemove(itemId);

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
export { getAllPosts, getOnePost, updatePost, createPost, deletePost };
