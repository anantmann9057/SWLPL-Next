import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/auth/login" || path === "/auth/signup";
  const token = request.cookies.get("token")?.value;
  
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Otherwise, allow the request
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth/login", "/auth/signup"],
};
