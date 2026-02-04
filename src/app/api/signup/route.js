import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request) {
  try {
    const data = await request.formData();
    const email = data.get("email");
    const password = data.get("password");
    const userId = data.get("userId");

    if (!email || !password || !userId) {
      return NextResponse.json(
        { message: "Invalid Credentials", status: 400 },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { userId: userId }],
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email or userId already exists", status: 400 },
        { status: 400 }
      );
    }

    // Create new user
    const newUser = new User({
      email: email.toLowerCase(),
      password: password, // Will be hashed by the pre-save hook
      userId: userId,
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully", status: 200 },
      { status: 200 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "Email or userId already exists", status: 400 },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Server Error", status: 500 },
      { status: 500 }
    );
  }
}
