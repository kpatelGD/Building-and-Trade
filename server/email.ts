import { Resend } from "resend";
import type { Inquiry } from "@shared/schema";

const resend = new Resend(process.env.RESEND_API_KEY);

const RECIPIENT_EMAIL = "info@btichicago.com";
const FROM_EMAIL = "BTI Contact Form <onboarding@resend.dev>";

export async function sendInquiryEmail(inquiry: Inquiry): Promise<void> {
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: RECIPIENT_EMAIL,
    subject: `New Quote Request – ${inquiry.service}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #fafaf9; border-radius: 8px;">
        <div style="background: #c2651e; padding: 20px 24px; border-radius: 6px 6px 0 0;">
          <h1 style="color: #fff; margin: 0; font-size: 20px;">New Quote Request</h1>
          <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0; font-size: 14px;">Building and Trade Industry Inc.</p>
        </div>

        <div style="background: #fff; padding: 24px; border: 1px solid #e8e0d8; border-top: none; border-radius: 0 0 6px 6px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0ebe4; width: 140px;">
                <strong style="color: #7a6a5a; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Name</strong>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0ebe4; font-size: 15px; color: #1f1a14;">
                ${inquiry.name}
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0ebe4;">
                <strong style="color: #7a6a5a; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Email</strong>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0ebe4; font-size: 15px; color: #1f1a14;">
                <a href="mailto:${inquiry.email}" style="color: #c2651e; text-decoration: none;">${inquiry.email}</a>
              </td>
            </tr>
            ${inquiry.phone ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0ebe4;">
                <strong style="color: #7a6a5a; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Phone</strong>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0ebe4; font-size: 15px; color: #1f1a14;">
                <a href="tel:${inquiry.phone}" style="color: #c2651e; text-decoration: none;">${inquiry.phone}</a>
              </td>
            </tr>` : ""}
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0ebe4;">
                <strong style="color: #7a6a5a; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Service</strong>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0ebe4; font-size: 15px; color: #1f1a14;">
                ${inquiry.service}
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; vertical-align: top;">
                <strong style="color: #7a6a5a; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Message</strong>
              </td>
              <td style="padding: 10px 0; font-size: 15px; color: #1f1a14; line-height: 1.6;">
                ${inquiry.message.replace(/\n/g, "<br>")}
              </td>
            </tr>
          </table>

          <div style="margin-top: 24px; padding: 14px 18px; background: #fdf6ef; border-radius: 6px; border: 1px solid #f0e8da;">
            <p style="margin: 0; font-size: 13px; color: #7a6a5a;">
              Received on ${new Date(inquiry.createdAt).toLocaleString("en-US", {
                weekday: "long", year: "numeric", month: "long", day: "numeric",
                hour: "2-digit", minute: "2-digit"
              })}
            </p>
          </div>

          <div style="margin-top: 20px; text-align: center;">
            <a href="mailto:${inquiry.email}?subject=Re: Your Quote Request for ${encodeURIComponent(inquiry.service)}"
               style="display: inline-block; background: #c2651e; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: 600;">
              Reply to ${inquiry.name}
            </a>
          </div>
        </div>
      </div>
    `,
  });

  if (error) {
    throw new Error(`Failed to send email: ${error.message}`);
  }
}
