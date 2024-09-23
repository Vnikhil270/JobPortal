import bcrypt from "bcrypt";
import { User } from "@/lib/modals/userSchema";
import mongoose from "mongoose";
import { connectionStr } from "@/lib/db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET;

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
  const body = await request.json();
  const { email, password } = body;

  try {
    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate JWT token with user info
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Return the token along with user data
    const response = NextResponse.json(
      {
        message: "Sign-in successful",
        token, // Send the token to the client
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      },
      { status: 200 }
    );
    response.cookies.set("authToken", token);
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
