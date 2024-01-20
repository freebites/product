/*
 * Controllers for User Database. These implement the functions that are
 * called for each route in the user database.
 */
import User from "../models/userModel";

// gets all users from the database
const getAllUsers = async (req, res) => {
	try {
		const users = await User.find();
		// console.log(Item);
		console.log("users acquired", users);
		res.json(users);
	} catch (error) {
		res.status(500).json({ error: "Something went wrong" });
	}
};

// gets one user from the database. note: we user firebase uid instead of mongoDB _id
const getOneUser = async (req, res) => {
	const userId = req.params.id;
	console.log("looking");
	try {
		const user = await User.findOne({ uid: userId });
		console.log("item acquired", user);
		res.json(user);
	} catch (error) {
		res.status(500).json({ error: "Something went hi" });
	}
};

const createUser = async (req, res) => {
	const user = req.body; // same as the posts schema

	try {
		const savedUser = await User.create(user);
		res.json(savedUser);
	} catch (error) {
		console.log("creating review document", error);
	}
};

const updateUser = async (req, res) => {
	try {
		const UserId = req.params.id;
		const updatedData = req.body;

		console.log("gets here");

		// Find the item by firebase UID and update its properties
		const updatedUser = await User.findOneAndUpdate(
			{ uid: UserId },
			updatedData,
			{
				new: true,
			}
		);

		if (!updatedUser) {
			console.log("gets here");
			return res.status(404).json({ message: "Item not found" });
		}

		res.json(updatedUser);
	} catch (error) {
		console.error("Error updating item IN BACKEND:", error);
		res.status(500).send("Internal Server Error");
	}
};

const deleteUser = async (req, res) => {
	try {
		const UserId = req.params.id;

		console.log("gets here");

		// Find the item by firebase UID and remove it
		const deletedUser = await User.findOneAndDelete({ uid: UserId });

		if (!deletedUser) {
			return res.status(404).json({ message: "Item not found" });
		}

		res.json({ message: "Item deleted successfully" });
	} catch (error) {
		console.error("Error deleting item:", error);
		res.status(500).send("Internal Server Error");
	}
};

export { getAllUsers, getOneUser, createUser, updateUser, deleteUser };
