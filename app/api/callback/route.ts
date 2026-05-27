import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!client_id || !client_secret) {
    return new Response(
      `
      <html>
        <body style="font-family: sans-serif; padding: 40px; background: #f7f7f5; display: flex; align-items: center; justify-content: center; min-height: 80vh;">
          <div style="background: white; border: 1px solid #e4e4e2; padding: 30px; border-radius: 12px; max-width: 500px; text-align: center;">
            <h1 style="color: #ef4444; margin-top: 0;">Configuration Missing</h1>
            <p>Please make sure you have added your <strong>SPOTIFY_CLIENT_ID</strong> and <strong>SPOTIFY_CLIENT_SECRET</strong> to your <strong>.env.local</strong> file first, then restart your dev server!</p>
          </div>
        </body>
      </html>
      `,
      { headers: { "Content-Type": "text/html" } }
    );
  }

  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: "http://127.0.0.1:3000/api/callback",
      }),
    });

    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ error: data.error_description || data.error }, { status: 500 });
    }

    return new Response(
      `
      <html>
        <body style="font-family: sans-serif; padding: 40px; background: #f7f7f5; color: #121212; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 80vh;">
          <div style="background: white; border: 1px solid #e4e4e2; padding: 30px; border-radius: 12px; max-width: 500px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); text-align: center;">
            <h1 style="color: #1DB954; margin-top: 0;">Spotify Connected!</h1>
            <p>Here is your Refresh Token. Copy it and paste it into your <strong>.env.local</strong> file as <strong>SPOTIFY_REFRESH_TOKEN</strong>:</p>
            <textarea readonly style="width: 100%; height: 80px; padding: 10px; border-radius: 6px; border: 1px solid #e4e4e2; font-family: monospace; font-size: 0.9em; resize: none; margin: 15px 0; background: #fafafa;">${data.refresh_token}</textarea>
            <p style="font-size: 0.85em; color: #666;">Once saved, you can delete this helper file (<code>app/api/callback/route.ts</code>) and we'll implement the live Spotify player!</p>
          </div>
        </body>
      </html>
      `,
      { headers: { "Content-Type": "text/html" } }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to exchange token" }, { status: 500 });
  }
}
