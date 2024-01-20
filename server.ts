// import postContext from "./context/postContext";

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
// const mongodb = require("")

const app = express();
const port = 3001;

// Enable CORS to allow requests from React Native app
app.use(cors());
app.use(bodyParser.json());

// Connect to Posts database (default database)
mongoose
	.connect(
		"mongodb+srv://freebites7:1234@freebites.w7sk83d.mongodb.net/Posts?retryWrites=true&w=majority",
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.catch((err) => {
		console.log("error connecting to db", err);
	});

// Connect to Accounts database (profiles database)
const accountConnection = mongoose.createConnection(
	"mongodb+srv://freebites7:1234@freebites.w7sk83d.mongodb.net/Accounts?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

// listeners for connection and errors
accountConnection.on("connected", () => {
	console.log("Account database connection successful!");
});

accountConnection.on("error", (error) => {
	console.error("Error connecting to account database: ", error);
});

const allergen = new mongoose.Schema({
	allergen: String,
});

const diet = new mongoose.Schema({
	diet: String,
});

const tags = new mongoose.Schema({
	perishable: Boolean,
	allergens: [allergen],
	diet: [diet],
});

const comment = new mongoose.Schema({
	username: String,
	body: String,
	timestamp: Date, // may need to be changed to string
});

const imageURI = new mongoose.Schema({ URI: String });

// Define a schema for the "items" collection
const itemSchema = new mongoose.Schema({
	// _id: mongoose.Schema.Types.ObjectID,
	title: String,
	description: String,
	imageURIs: [String],
	tag: tags,
	location: String,
	comments: [comment],
	post_id: String,
	room: String,
	postTime: Date,
});

// Create a model for the "items" collection
const Item = mongoose.model("freebites", itemSchema, "Posts");

// API endpoint to get all items from MongoDB
app.get("/api/Posts", async (req, res) => {
	try {
		const items = await Item.find();
		// console.log(Item);
		console.log("items acquired", items);
		res.json(items);
	} catch (error) {
		res.status(500).json({ error: "Something went wrong" });
	}
});

// API endpoint to get one specific post from MongoDB
app.get("/api/Posts/:id", async (req, res) => {
	const itemId = req.params.id;
	console.log("looking");
	try {
		const item = await Item.findOne({ _id: itemId });
		console.log("item acquired", item);
		res.json(item);
	} catch (error) {
		res.status(500).json({ error: "Something went hi" });
	}
});

app.post("/api/Posts", async (req, res) => {
	const post = req.body; // same as the posts schema

	try {
		const savedItem = await Item.create(post);
		res.json(savedItem);
	} catch (error) {
		console.log("creating review document", error);
	}
});

app.put("/api/Posts/:id", async (req, res) => {
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
});

// API endpoint for deleting data
app.delete("/api/Posts/:id", async (req, res) => {
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
});

////////////////////////////
/// USER SCHEMA AND ENDPOINTS -- TODO: clean this backend shit up

// firstName
// string
// lastName
// string
// Email Address
// string
// Password
// string (hashed)
// profile
// string (firebase path [not URL, just rel. path])
// Bio
// string
// Pronouns
// string

//
const UserSchema = new mongoose.Schema({
	uid: { type: String, required: true, unique: true }, // firebase UID. we use this instead of the mongoDB _id
	firstName: String,
	lastName: String,
	emailAddress: String,
	password: String,
	profile: String,
	bio: String,
	pronouns: String,
});

// Create a model for the "items" collection
const User = accountConnection.model("freebites_users", UserSchema, "profiles");
// TODO: get all users from a databse
// gets all users from the collection
app.get("/api/Users", async (req, res) => {
	try {
		const users = await User.find();
		// console.log(Item);
		console.log("users acquired", users);
		res.json(users);
	} catch (error) {
		res.status(500).json({ error: "Something went wrong" });
	}
});

////USER INTERACTION LOL

// get one user from the collection. based off uid generated by firebase, NOT
// by mongoDB

app.get("/api/Users/:id", async (req, res) => {
	const userId = req.params.id;
	console.log("looking");
	try {
		const user = await User.findOne({ uid: userId });
		console.log("item acquired", user);
		res.json(user);
	} catch (error) {
		res.status(500).json({ error: "Something went hi" });
	}
});

// post a user to the collection
app.post("/api/Users", async (req, res) => {
	const user = req.body; // same as the posts schema

	try {
		const savedUser = await User.create(user);
		res.json(savedUser);
	} catch (error) {
		console.log("creating review document", error);
	}
});

// update a user's information in the collection
app.put("/api/Users/:id", async (req, res) => {
	try {
		const UserId = req.params.id;
		const updatedData = req.body;

		console.log("gets here");

		// Find the item by firebase UID and update its properties
		const updatedUser = await Item.findOneAndUpdate(
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
});

// delete a user from the collection
app.delete("/api/Users/:id", async (req, res) => {
	try {
		const UserId = req.params.id;

		console.log("gets here");

		// Find the item by firebase UID and remove it
		const deletedUser = await Item.findOneAndDelete({ uid: UserId });

		if (!deletedUser) {
			return res.status(404).json({ message: "Item not found" });
		}

		res.json({ message: "Item deleted successfully" });
	} catch (error) {
		console.error("Error deleting item:", error);
		res.status(500).send("Internal Server Error");
	}
});

// Start the server
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
