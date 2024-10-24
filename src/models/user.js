import mongoose from "mongoose";

// Defining a mongoose schema for the User model
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
});

// Creating a mongoose model named "User" based on the UserSchema
const User = mongoose.models.User || mongoose.model("User", UserSchema);

// Exporting the User model for use in other parts of the application
export default User;

// Use:

// This file defines the structure of the User model in the application.
// The User model is exported for use in other parts of the application to interact with the users' data in the database.