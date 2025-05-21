import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json(
      {
        message: "Logout success",
        success: true,
      },
      {
        status: 200,
      }
    );
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    response.cookies.set("user", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return response;
  } catch (e) {
    return NextResponse.json(
      {
        error: e.message,
      },
      {
        status: 400,
      }
    );
  }
}
