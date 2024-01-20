import Item from "../models/postModel";

/*
 * controller functions that define the CRUD operations for the Posts database
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

const createPost = async (req, res) => {
	const post = req.body; // should be the same as the posts schema

	try {
		const savedItem = await Item.create(post);
		res.json(savedItem);
	} catch (error) {
		console.log("creating review document", error);
	}
};

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
export { getAllPosts, getOnePost, updatePost, createPost, deletePost };
