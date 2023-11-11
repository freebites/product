// import postContext from "./context/postContext";

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3001;

// Enable CORS to allow requests from React Native app
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
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
	_id: mongoose.Schema.Types.ObjectID,
	title: String,
	description: String,
	imageURIs: [imageURI],
	tag: tags,
	location: String,
	comments: [comment],
	post_id: String,
	room: String,
	postTime: Date,
});

// const itemSchema = new mongoose.Schema({
//   title: String

// });

// const itemSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   imageURIs: String,
//   tags: String,
//   location: String,
//   comments: String,
//   post_id: String,
//   room: String,
//   postTime: Date,
// });

// Create a model for the "items" collection
const Item = mongoose.model("freebites", itemSchema, "Posts");

// Item.createCollection().then(function (collection) {
//   console.log("Collection made");
// });

// const getDBs = async () => {
//   try {
//     const collections = db.
//   }
// }

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

// API endpoint to post something from MongoDB
app.post("/api/Posts/:id", async (req, res) => {
	const post = req.body; // same as the posts schema
	console.log("body", post);

	try {
		await Item.create(post);
	} catch (error) {
		console.log("creating review document", error);
	}

	res.json({ message: "Successful review submission" });
});

// Start the server
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
