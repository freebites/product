import mongoose from "mongoose";

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

const comment = new mongoose.Schema(
	{
		id: Number,
		username: String,
		body: String,
		timestamp: Date, // may need to be changed to string
	},
	{ _id: false } // disables mongoDB id creation, we can re-enable if we
	// run into issues w/ rendering comments (ensure unique keys)
);

// const imageURI = new mongoose.Schema({ URI: String });

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

export default Item;
