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
    const { username, password, role } = reqBody;

    console.log(reqBody);
    let user = await User.findOne({ username });
    if (user)
      return NextResponse.json({ error: "user already exists please login" }, { status: 400 });
    console.log(user);

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    console.log(hashPassword);

    let newUser = await User.create({ username, password });
    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully!", user: newUser, success: true },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
