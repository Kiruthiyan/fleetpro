import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    // Allow access to login and signup pages
    if (pathname === "/login" || pathname === "/signup") {
        return NextResponse.next();
    }

    // Protect dashboard routes
    if (pathname.startsWith("/dashboard")) {
        // Auth check will be handled in the component
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/login", "/signup"],
};

