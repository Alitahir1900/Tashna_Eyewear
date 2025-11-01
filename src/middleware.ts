import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdmin = token?.role === "ADMIN" || token?.role === "MANAGER" || token?.role === "ORDER_FULFILLMENT";
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

    // Redirect non-admin users trying to access admin routes
    if (isAdminRoute && !isAdmin) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;

        // Public routes
        const publicRoutes = ["/", "/shop", "/product", "/category", "/about", "/contact", "/search", "/login", "/register"];
        if (publicRoutes.some(route => path.startsWith(route) || path === route)) {
          return true;
        }

        // Protected routes require authentication
        if (path.startsWith("/account") || path.startsWith("/admin")) {
          return !!token;
        }

        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/account/:path*", "/admin/:path*"],
};
