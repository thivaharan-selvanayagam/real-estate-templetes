import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const callbackUrl = searchParams.get("callbackUrl") || "/sold-homes";

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const redirectUri = `${siteUrl}/api/auth/google/callback`;

  // If Google OAuth Client ID is configured in .env.local, redirect to Google OAuth Consent Screen
  if (clientId && clientId !== "undefined" && clientId !== "") {
    const googleAuthUrl =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${encodeURIComponent(clientId)}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `response_type=code&` +
      `scope=${encodeURIComponent("openid profile email")}&` +
      `state=${encodeURIComponent(callbackUrl)}`;

    return NextResponse.redirect(googleAuthUrl);
  }

  // Fallback: Set authenticated session cookie directly and return to sold-homes
  const response = NextResponse.redirect(new URL(callbackUrl, request.url));
  response.cookies.set("session", "user_authenticated_google_session", {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return response;
}