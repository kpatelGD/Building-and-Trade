import type { Inquiry } from "@shared/schema";

const RECIPIENT_EMAIL = "info@btichicago.com";
const WEB3FORMS_URL = "https://api.web3forms.com/submit";

export async function sendInquiryEmail(inquiry: Inquiry): Promise<void> {
  const accessKey = process.env.WEB3FORMS_KEY;

  if (!accessKey) {
    throw new Error("WEB3FORMS_KEY environment variable is not set");
  }

  const response = await fetch(WEB3FORMS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `New Quote Request – ${inquiry.service}`,
      from_name: "BTI Contact Form",
      name: inquiry.name,
      email: inquiry.email,
      phone: inquiry.phone || "Not provided",
      service: inquiry.service,
      message: inquiry.message,
      botcheck: "",
    }),
  });

  const result = await response.json() as { success: boolean; message?: string };

  if (!result.success) {
    throw new Error(`Web3Forms error: ${result.message || "Unknown error"}`);
  }
}
