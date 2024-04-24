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
		id: Number,
		username: String,
		body: String,
		timestamp: Date, // may need to be changed to string
	},
	{ _id: false } // disables mongoDB id creation, we can re-enable if we
	// run into issues w/ rendering comments (ensure unique keys)
);

const Location = new mongoose.Schema({
	place_id: String,
	location: {
		type: { type: String },
		enum: ["Point"],
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

// index the parameters that you want to be able to search in
itemSchema.index({
	"tag.allergens": "text",
	"tag.diet": "text",

	title: "text",
	description: "text", // can take title/description out tbh
});

itemSchema.index({
	"tag.perishable": 1, // boolean
	postTime: -1, // descending order (most recent first i think)
});

itemSchema.index({
	"location.location.coordinates": "2dsphere", // enables geospatial search
});
// Create a model for the "items" collection

const Item = mongoose.model("freebites", itemSchema, "Posts");

// print statements to check if indexing functioned properly
Item.on("index", function (error) {
	if (error) {
		console.log("Indexing error:", error);
	}
});

Item.listIndexes()
	.then((indexes) => {
		console.log("Indexes:", indexes);
	})
	.catch((err) => {
		console.error("Error listing indexes:", err);
	});
export default Item;
