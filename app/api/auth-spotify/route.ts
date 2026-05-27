import { NextResponse } from "next/server";

export async function GET() {
  const client_id = process.env.SPOTIFY_CLIENT_ID;

  if (!client_id || client_id === "YOUR_CLIENT_ID_HERE") {
    return new Response(
      `
      <html>
        <body style="font-family: sans-serif; padding: 40px; background: #f7f7f5; display: flex; align-items: center; justify-content: center; min-height: 80vh;">
          <div style="background: white; border: 1px solid #e4e4e2; padding: 30px; border-radius: 12px; max-width: 500px; text-align: center;">
            <h1 style="color: #ef4444; margin-top: 0;">Client ID Missing</h1>
            <p>Please make sure you have added your <strong>SPOTIFY_CLIENT_ID</strong> to your <strong>.env.local</strong> file first, then restart your dev server!</p>
          </div>
        </body>
      </html>
      `,
      { headers: { "Content-Type": "text/html" } }
    );
  }

  const redirect_uri = "http://localhost:3000/api/callback";
  const scopes = "user-read-currently-playing";
  
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${encodeURIComponent(
    redirect_uri
  )}&scope=${encodeURIComponent(scopes)}`;

  return NextResponse.redirect(authUrl);
}
