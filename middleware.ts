import { NextRequest, NextResponse } from 'next/server'

const publicRoutes = [
    '/login',
]

const donorRoutes = [
    '/donor/dashboard',
    '/donor/profile',
]

const charityRoutes = [
    '/charity/dashboard',
]

export function middleware(request: NextRequest): NextResponse {
    const { pathname } = request.nextUrl
    
    // Get authentication data from cookies
    const authCookie = request.cookies.get('charityflow_auth')
    let user = null

    if (authCookie) {
        try {
            user = JSON.parse(authCookie.value)
        } catch (error) {
            // Invalid auth cookie, clear it
            console.log(error)
            const response = NextResponse.next()
            response.cookies.delete('charityflow_auth')
            return response
        }
    }

    // Check if route is protected
    // const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))

    // Handle unauthenticated users
    // if (!user) {
    //   if (isProtectedRoute) {
    //     // Redirect to login with return URL
    //     const loginUrl = new URL('/login', request.url)
    //     loginUrl.searchParams.set('redirect', pathname)
    //     return NextResponse.redirect(loginUrl)
    //   }
    //   // Allow access to public routes
    //   return NextResponse.next()
    // }

    // Handle authenticated users
    if (user) {
        // Redirect authenticated users away from public routes
        if (isPublicRoute) {
            const dashboardUrl = user.type === 'donor'
                ? '/donor/dashboard'
                : '/charity/dashboard'
            return NextResponse.redirect(new URL(dashboardUrl, request.url))
        }

        // Check user type access to specific routes
        if (user.type === 'donor' && charityRoutes.some(route => pathname.startsWith(route))) {
            // Donor trying to access charity routes
            return NextResponse.redirect(new URL('/donor/dashboard', request.url))
        }

        if (user.type === 'charity' && donorRoutes.some(route => pathname.startsWith(route))) {
            // Charity trying to access donor routes
            return NextResponse.redirect(new URL('/charity/dashboard', request.url))
        }
    }

    // Add security headers
    const response = NextResponse.next()

    // Security headers
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    response.headers.set(
        'Content-Security-Policy',
        "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https:;"
    )

    // Add user info to headers for API routes (optional)
    if (user && pathname.startsWith('/api/')) {
        response.headers.set('X-User-ID', user.id)
        response.headers.set('X-User-Type', user.type)
    }

    return response
}

// Configure which routes the middleware should run on
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder files
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}