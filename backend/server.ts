// import postContext from "./context/postContext";

import accountConnection from "./config/userDatabase";
import userRouter from "./routes/userRoutes";

import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import postRouter from "./routes/postRoutes";
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
		} as ConnectOptions
	)
	.catch((err) => {
		console.log("error connecting to db", err);
	});

// listeners for account connection and errors
accountConnection.on("connected", () => {
	console.log("Account database connection successful!");
});

accountConnection.on("error", (error) => {
	console.error("Error connecting to account database: ", error);
});

// use routes from post database
app.use(postRouter);

// use routes from user database
app.use(userRouter);

// Start the server
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
