import connectToDB from "@/database";
import User from "@/models/user";
import { hash } from "bcryptjs";
import Joi from "joi";
import { NextResponse } from "next/server"; //NextResponse simplifies the process of handling and sending HTTP responses in a Next.js API route.

// Defining a Joi schema for input validation
const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().required(),
});

// Exporting a constant named "dynamic"
export const dynamic = "force-dynamic";

// POST request handler function
export async function POST(req) {
  // Connecting to the MongoDB database
  await connectToDB();

  // Destructuring data from the request body
  const { name, email, password, role } = await req.json();

  // Validating the request data against the defined schema
  const { error } = schema.validate({ name, email, password, role });

  // Handling validation errors
  if (error) {
    return NextResponse.json({
      success: false,
      message: error.details[0].message,
    });
  }

  try {
    // Checking if the user already exists in the database
    const isUserAlreadyExists = await User.findOne({ email });
    // Handling case where the user already exists
    if (isUserAlreadyExists) {
      return NextResponse.json({
        success: false,
        message: "User is already exists. Please try with different email.",
      });
    } else {
      // Hashing the user's password
      const hashPassword = await hash(password, 12);

      // Creating a new user in the database
      const newlyCreatedUser = await User.create({
        name,
        email,
        password: hashPassword,
        role,
      });

      // Handling successful user creation
      if (newlyCreatedUser) {
        return NextResponse.json({
          success: true,
          message: "Account created successfully.",
        });
      }
    }
  } catch (error) {
    console.log("Error while new user registration. Please try again");

    // Handling general errors during user registration
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again later",
    });
  }
}

// Use:

// This file handles the user registration API endpoint ("/api/register").
// It uses the connectToDB function to establish a connection to the MongoDB database before processing the user registration.
// The User model is used to interact with the MongoDB database to check for existing users and create new users.