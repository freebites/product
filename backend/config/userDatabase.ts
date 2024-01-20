/*
 * database configuration and setup for the user database on MongoDB
 */
import mongoose, { ConnectOptions } from "mongoose";

// Connect to Accounts database (profiles database)
const accountConnection = mongoose.createConnection(
	"mongodb+srv://freebites7:1234@freebites.w7sk83d.mongodb.net/Accounts?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	} as ConnectOptions
);

export default accountConnection;
