/*
 * database configuration and setup for the user database on MongoDB
 */
import mongoose from "mongoose";

const accountConnection = mongoose.createConnection(
  "mongodb+srv://freebites7:1234@freebites.w7sk83d.mongodb.net/Accounts?retryWrites=true&w=majority"
);

export default accountConnection;
