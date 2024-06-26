import { NextResponse, NextRequest } from 'next/server'
// import type { NextRequest } from 'next/server'
export { default } from "next-auth/middleware"
import { getToken } from 'next-auth/jwt'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    // const url = request.nextUrl
    const { pathname } = request.nextUrl;

    if (token && (
        pathname.startsWith('/sign-in') ||
        pathname.startsWith('/sign-up') ||
        pathname.startsWith('/verify') ||
        pathname.startsWith('/')
    )) {
        return NextResponse.redirect(request.nextUrl);
    }
    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/sign-in',
        '/sign-up',
        '/',
        '/dashboard/:path*',
        '/verify/:path*'
    ],
}
