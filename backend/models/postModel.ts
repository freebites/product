import mongoose from "mongoose";

// const allergen = new mongoose.Schema({
// 	allergen: String,
// });

// const diet = new mongoose.Schema({
// 	diet: String,
// });

const tags = new mongoose.Schema({
	perishable: Boolean,
	allergens: [String],
	diet: [String],
});

const comment = new mongoose.Schema(
	{
		username: String,
		body: String,
		timestamp: Date, // may need to be changed to string
	},
);

const Location = new mongoose.Schema({
	place_id: String,
	location: {
		type: { type: String },
		coordinates: [Number],
	},
});
// const imageURI = new mongoose.Schema({ URI: String });

// Define a schema for the "items" collection
const itemSchema = new mongoose.Schema({
	// _id: mongoose.Schema.Types.ObjectID,
	title: String,
	description: String,
	imageURIs: [String],
	tag: tags,
	location: Location,
	comments: [comment],
	post_id: String,
	room: String,
	postTime: Date,
});

// Create a model for the "items" collection
const Item = mongoose.model("freebites", itemSchema, "Posts");

export default Item;
