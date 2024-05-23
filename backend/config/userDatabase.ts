/*
 * database configuration and setup for the user database on MongoDB
 */
import mongoose from "mongoose";

const accountConnection = mongoose.createConnection(
  "mongodb+srv://freebites7:1234@freebites.w7sk83d.mongodb.net/Accounts?retryWrites=true&w=majority"
);

// Connect to Accounts database (profiles database)
// const accountConnection = (): mongoose.Connection => {
//   // Do this instead
//   try {
//     const hello = mongoose
//       .createConnection(
//         "mongodb+srv://freebites7:1234@freebites.w7sk83d.mongodb.net/Accounts?retryWrites=true&w=majority"
//       )
//       .asPromise();
//     console.log("connected to accounts database");
//     return hello;
//   } catch (error) {
//     console.log("error connecting to accounts database");
//     throw error;
//   }
// };
export default accountConnection;
