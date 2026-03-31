import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import { SafariEnquiry } from "@/app/emails/SafariEnquiry";
import { ConfirmationEmail } from "@/app/emails/ConfirmationEmail";

/* ─── Types ──────────────────────────────────────────── */
interface SafariFormData {
  firstName: string;
  lastName: string;
  email: string;
  heardFrom: string;
  language: string;
  travelWith: string;
  occasion: string;
  exactDates: string;
  startDate: string;
  endDate: string;
  departurePeriod: string;
  duration: string;
  extras: string[];
  zanzibarDuration: string;
  parks: string[];
  additionalActivities: string;
  activities: string[];
  accommodation: string;
  accommodationCategory: string;
  locationPreference: string;
  dreamSafari: string;
  budget: string;
  contactAgain: string;
}



/* ─── API Route ──────────────────────────────────────── */
export async function POST(req: NextRequest) {
  try {
    const data: SafariFormData = await req.json();

    if (!data.email || !data.firstName) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    /* ── Nodemailer transporter ── */
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const fullName = `${data.firstName} ${data.lastName}`.trim();

    /* ── Render emails using react-email ── */
    const enquiryHtml = await render(SafariEnquiry({ data }));
    const confirmationHtml = await render(
      ConfirmationEmail({ firstName: data.firstName, email: data.email })
    );

    /* ── Send to company ── */
    await transporter.sendMail({
      from: `"FurahaYao Safaris Contact" <${process.env.SMTP_FROM}>`,
      to: process.env.COMPANY_EMAIL,
      replyTo: `"${fullName}" <${data.email}>`,
      subject: `🦁 New Safari Request — ${fullName}`,
      html: enquiryHtml,
    });

    /* ── Send confirmation to traveller ── */
    await transporter.sendMail({
      from: `"FurahaYao Safaris" <${process.env.SMTP_FROM}>`,
      to: `"${fullName}" <${data.email}>`,
      subject: "Your FurahaYao Safari request — we received it ✦",
      html: confirmationHtml,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email error:", err);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}