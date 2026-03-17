import { Resend } from "resend";
import type { Inquiry } from "@shared/schema";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendInquiryEmail(inquiry: Inquiry): Promise<void> {
  const { error } = await resend.emails.send({
    from: "BTI Contact Form <onboarding@resend.dev>",
    to: "monarch32002@gmail.com",
    subject: `New Quote Request – ${inquiry.service}`,
    html: `
      <h2>New Quote Request from BTI Website</h2>
      <table style="border-collapse:collapse;width:100%;font-family:sans-serif;">
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Name</td><td style="padding:8px;border:1px solid #ddd;">${inquiry.name}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #ddd;">${inquiry.email}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Phone</td><td style="padding:8px;border:1px solid #ddd;">${inquiry.phone || "Not provided"}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Service</td><td style="padding:8px;border:1px solid #ddd;">${inquiry.service}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Message</td><td style="padding:8px;border:1px solid #ddd;">${inquiry.message}</td></tr>
      </table>
    `,
  });

  if (error) {
    throw new Error(`Failed to send email: ${error.message}`);
  }
}
