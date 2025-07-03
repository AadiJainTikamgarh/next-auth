import connect from "@/db/dbconfig.js";
import { User } from "@/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json({ error: "Invalid Password" }, { status: 401 });
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login Successfull",
      success: true,
      user: user.username
    });

    response.cookies.set("token", token, { httpOnly: true });

    return response
  } catch (error) {
    return NextResponse.json({error: error.message}, {status: 500})
  }
}
