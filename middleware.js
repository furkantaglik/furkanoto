import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse, NextRequest } from "next/server";

export default authMiddleware({
  afterAuth(auth, req) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    if (
      auth.userId !== "user_2aa1UrWLEdAU5EfrGlH2AnjLi49" &&
      !auth.isPublicRoute
    ) {
      return NextResponse.redirect(url);
    }
    if (!auth.userId && req.nextUrl.pathname === "/Saved") {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
  },
  publicRoutes: ["/","/Saved"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
