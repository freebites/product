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
		// console.log(Item);
		console.log("items acquired", items);
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
	console.log("looking");
	try {
		const item = await Item.findOne({ _id: itemId });
		console.log("item acquired", item);
		res.json(item);
	} catch (error) {
		res.status(500).json({ error: "Something went hi" });
	}
};

/**
 * @description Gets posts with filter from the database.
 * @route GET /api/Posts/ {query parameters}
 * @param { coordinates?, maxDistance?, filter?, } params - should be { string, string, distance in meters, string }
 */
const getPostsWithFilter = async (req, res) => {
	// yoinks the query params like .../Posts?keyword=apple&location=store
	// it'll get keyword = apple, location = store

	try {
		const query = req.query;
		console.log("Applying Filters: ", query);
		const filters = buildPostQueryConditions(query);
		console.log(filters);
		const items = await Item.find(filters);
		console.log(items);
		res.json(items);
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
		const simpleError = {
			message: error.message,
			stack: error.stack,
			// You can manually copy other properties if necessary and safe
		};
		console.log(simpleError);
	}
};

// interface defining type for query (for building the filter query)
interface PostQueryConditions {
	// all fields are optional to account for no filter applied
	$text?: {
		$search: string;
	};
	location?: {
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
function buildPostQueryConditions(filters) {
	// empty conditions by default
	const conditions: PostQueryConditions = {};
	// checks for tag filter
	if (filters.keyword) {
		// can further optimize by only searching in tags field, but would need sep
		conditions.$text = { $search: filters.keyword };
	}

	// turns the lat/long coordinate [x, y] into mongoDB geospatial query params
	if (filters.latitude && filters.longitude) {
		// default to 5km radius if maxDistance isn't applied
		const longitude = filters.longitude;
		const latitude = filters.latitude;
		const maxDistance = filters.maxDistance
			? parseInt(filters.maxDistance)
			: 5000;
		conditions.location = {
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

const createPost = async (req, res) => {
	const post = req.body; // should be the same as the posts schema

	try {
		const savedItem = await Item.create(post);
		res.json(savedItem);
	} catch (error) {
		console.log("creating review document", error);
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

		console.log("gets here");

		// Find the item by ID and update its properties
		const updatedItem = await Item.findByIdAndUpdate(itemId, updatedData, {
			new: true,
		});

		if (!updatedItem) {
			console.log("gets here");
			return res.status(404).json({ message: "Item not found" });
		}

		res.json(updatedItem);
	} catch (error) {
		console.error("Error updating item IN BACKEND:", error);
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

		console.log("gets here");

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
export {
	getAllPosts,
	getOnePost,
	getPostsWithFilter,
	updatePost,
	createPost,
	deletePost,
};
