import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state") || "/sold-homes";
  const error = searchParams.get("error");

  const host = request.headers.get("x-forwarded-host") || request.headers.get("host") || "localhost:3000";
  const protocol = request.headers.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const redirectUri = `${origin}/api/auth/google/callback`;

  if (error || !code) {
    console.error("Google OAuth error or code missing:", error);
    return NextResponse.redirect(new URL("/sold-homes?error=oauth_failed", origin));
  }

  try {
    // 1. Exchange authorization code for tokens
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID || "",
        client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok || !tokenData.access_token) {
      console.error("Failed to exchange code for Google token:", tokenData);
      return NextResponse.redirect(new URL("/sold-homes?error=token_exchange_failed", origin));
    }

    // 2. Fetch authenticated user profile
    const userResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const userData = await userResponse.json();

    // 3. Create a lightweight session payload
    const sessionPayload = JSON.stringify({
      email: userData.email,
      name: userData.name,
      picture: userData.picture,
      sub: userData.sub,
      authenticatedAt: Date.now(),
    });

    // 4. Redirect user back to /sold-homes with the session cookie
    const destinationUrl = new URL(state.startsWith("/") ? state : "/sold-homes", origin);
    const response = NextResponse.redirect(destinationUrl);

    response.cookies.set("session", Buffer.from(sessionPayload).toString("base64"), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (err) {
    console.error("OAuth callback error:", err);
    return NextResponse.redirect(new URL("/sold-homes?error=server_error", origin));
  }
}