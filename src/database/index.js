import mongoose from "mongoose";

// Configuration options for mongoose connection
// const configOptions = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

// Function to connect to the MongoDB database
const connectToDB = () => {
  // MongoDB connection URL
  const connectionUrl = process.env.MONGODB_URL;
  console.log("Connection URL:", connectionUrl); 

  // Establishing the mongoose connection with the provided URL and options
  mongoose
    .connect(connectionUrl)
    .then(() => console.log("Ecommerce database connected successfully!"))
    .catch((err) =>
      console.log(`Getting Error from DB connection ${err.message}`)
    );
};

// Exporting the connectToDB function for use in other parts of the application
export default connectToDB;

// Use:

// This file is responsible for setting up a connection to the MongoDB database using the Mongoose library.
// The connectToDB function is exported for use in other parts of the application that require a database connection.
