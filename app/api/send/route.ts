import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields" },
        { status: 400 }
      );
    }

    // Dispatch email using Resend
    // Note: When using the free Resend testing API key, emails can only be sent from onboarding@resend.dev
    // to your verified Resend account email (randelf.amper@jmc.edu.ph).
    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "randelf.amper@jmc.edu.ph",
      subject: `✨ New Portfolio Message from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; padding: 20px; line-height: 1.6; max-width: 600px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #3b82f6; margin-top: 0; border-bottom: 1px solid #eee; padding-bottom: 10px;">
            New Portfolio Contact
          </h2>
          <p>You received a new message through your personal portfolio contact form:</p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          </div>
          <h3 style="color: #555;">Message Content:</h3>
          <p style="white-space: pre-wrap; background-color: #f9f9f9; padding: 15px; border-radius: 6px; border-left: 4px solid #3b82f6;">${message}</p>
          <p style="font-size: 0.85em; color: #888; margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px;">
            Sent automatically via Next.js and Resend.
          </p>
        </div>
      `,
    });

    if (data.error) {
      console.error("Resend API Error:", data.error);
      return NextResponse.json(
        { error: data.error.message || "Failed to dispatch email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, messageId: data.data?.id });
  } catch (error: any) {
    console.error("Server API Catch Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
