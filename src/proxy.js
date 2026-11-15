import { NextResponse } from "next/server";
import { auth } from "./lib/auth"; // path to your Better Auth server instance
import { headers } from "next/headers";


// This function can be marked `async` if using `await` inside
export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!session) {
    
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/my-bookings", '/add-destination', '/profile', '/destinations/:path'],
};
