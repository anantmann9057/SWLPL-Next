import { Connect } from "@/dbconfig/db.config.js";
import AppVersion from "@/models/version.models";
import { NextRequest, NextResponse } from "next/server";
Connect();
export async function GET() {
  try {
    let appVersion = await AppVersion.aggregate([
      {
        $match: {},
      },
    ]);

    if (!appVersion)
      return NextResponse.json(
        { success: true, message: "Nothing found!" },
        {
          status: 200,
        }
      );

    return NextResponse.json(
      { success: true, message: "Success", data: appVersion },
      {
        status: 200,
      }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { success: false, message: e.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const reqBody = await request.json();
    console.log(reqBody);
    const { version } = reqBody;

    let versionUpdate = await AppVersion.findOne({ version });

    if (versionUpdate)
      return NextResponse.json(
        { success: false, message: "This version already exists" },
        { status: 200 }
      );

    versionUpdate = await AppVersion.create({ version });

    return NextResponse.json(
      { success: true, message: "update success" },
      {
        status: 200,
      }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { success: false, message: e.message },
      { status: 500 }
    );
  }
}
