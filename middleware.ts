import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

// Only the admin dashboard and admin-only API routes require sign-in.
// Everything else (the public website) stays open to all visitors.
const isProtectedRoute = createRouteMatcher([
  "/admin(.*)",
  "/api/admins(.*)",
])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}
