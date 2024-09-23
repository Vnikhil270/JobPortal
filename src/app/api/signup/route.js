import { connectionStr } from "@/lib/db";
import { User } from "@/lib/modals/userSchema"; // Assuming your schema is stored here
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

// Connect to the database
async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(connectionStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { username, email, password } = body;

    // Check if email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        {
          result: false,
          message: "Email is already registered",
        },
        { status: 409 }
      );
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        result: true,
        message: "User registered successfully",
        data: newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error.name === "ValidationError") {
      return NextResponse.json(
        {
          result: false,
          message: error.message,
          errors: error.errors,
        },
        { status: 400 }
      );
    } else if (error.code === 11000) {
      // Duplicate key error
      const field = Object.keys(error.keyPattern)[0]; // Get the field with duplicate
      const message = `${
        field.charAt(0).toUpperCase() + field.slice(1)
      } is already in use.`;
      return NextResponse.json(
        {
          result: false,
          message,
        },
        { status: 409 }
      );
    } else {
      console.error("Error during user signup:", error);
      return NextResponse.json(
        {
          result: false,
          message: "An error occurred while processing your request",
          error: error.message,
        },
        { status: 500 }
      );
    }
  }
}
