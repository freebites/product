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

const userSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectID,
  firstName: String,
  lastName: String,
  pronouns: String,
  email: String,
  profilePic: String,
});

// Create a model for the "items" collection
const Item = mongoose.model("Post", itemSchema, "Posts");
const User = mongoose.model("Profile", userSchema, "Profiles");

// API endpoint to get all items from MongoDB
app.get("/api/Posts", async (req, res) => {
  try {
    const items = await Item.find();
    // console.log(Item);
    // console.log("items acquired", items);
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

// API endpoint to get one specific user from MongoDB
app.get("/api/Profiles/:email", async (req, res) => {
  const email = req.params.email;
  try {
    const user = await User.findOne({ email: email });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
