import accountConnection from "../config/userDatabase";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true }, // firebase UID. we use this instead of the mongoDB _id
  firstName: String,
  lastName: String,
  userName: String,
  emailAddress: String,
  password: String,
  profile: String,
  bio: String,
  pronouns: String,
  expoToken: String,
});

const connection = accountConnection;

// Create a model for the "users" collection
const User = connection.model("freebites_users", UserSchema, "profiles");

export default User;
