import { NextResponse } from "next/server";
import * as jose from "jose";

export default async function middleware(req) {
  const jwtSecret = process.env.JWT_SECRET;
  const encodedJwtSecret = new TextEncoder().encode(jwtSecret);
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const { payload } = await jose.jwtVerify(token, encodedJwtSecret);
    const headers = new Headers(req.headers);
    headers.set("middlewareSet", payload.role);

    const resp = NextResponse.next({
      request: {
        headers,
      },
    });

    return resp;
  } catch (error) {
    console.log({ error });
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard", "/dashboard/reviews"],
};
