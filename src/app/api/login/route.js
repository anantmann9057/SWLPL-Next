"use server";
import { Connect } from "@/dbconfig/db.config.js";
import User from "@/models/user.models.js";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

Connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    console.log(reqBody);

    const { username, password } = reqBody;

    let user = await User.findOne({ username });
    if (!user)
      return NextResponse.json(
        { error: "user not found", status: false, error_code: 404 },
        { status: 400 }
      );
    console.log(user);

    // const salt = await bcrypt.genSalt(10);
    // const hashPassword = await bcrypt.hash(password, salt);

    // console.log(hashPassword);

    let isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect)
      return NextResponse.json(
        { error: "password is not corrct", status: false },
        { status: 403 }
      );
    let token = await user.generateAccessToken();
    console.log(token);

    let response = NextResponse.json(
      { message: "login successfully!", user: user, success: true },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
    });
    response.cookies.set("user", JSON.stringify(user), {
      httpOnly: true,
    });
    return response;
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
