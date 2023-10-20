const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

// Enable CORS to allow requests from React Native app
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://jzhang43:mongoUser123@cluster0.ald6xta.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .catch((err) => {
    console.log("error connecting to db", err);
  });

// Define a schema for the "items" collection
const itemSchema = new mongoose.Schema({
  title: String,
});

// Create a model for the "items" collection
const Item = mongoose.model("Posts", itemSchema, "Posts");

// API endpoint to get all items from MongoDB
app.get("/api/items", async (req, res) => {
  try {
    const items = await Item.find();
    console.log("items acquired", items);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// app.post("/api/items", async (req, res) => {
//   const review = req.body; // same as the reviews schema
//   console.log("body", review);

//   try {
//     await Item.create(review);
//   } catch (error) {
//     console.log("creating review document", error);
//   }

//   res.json({ message: "Successful review submission" });
// });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
