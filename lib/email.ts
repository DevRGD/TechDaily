import nodemailer from 'nodemailer';
import dbConnect from '@/lib/db';
import Email from '@/models/Email';
import { SendEmailOptions } from '@/types';

export default async function sendEmail({ slug, to, bcc, replacements = {} }: SendEmailOptions) {
  await dbConnect();

  const emailTemplate = await Email.findOne({ slug });

  if (!emailTemplate) throw new Error(`Email template with slug "${slug}" not found in database.`);

  let rawHtmlContent = emailTemplate.content;

  for (const [key, value] of Object.entries(replacements)) {
    const regex = new RegExp(`{{${key}}}`, 'g');
    rawHtmlContent = rawHtmlContent.replace(regex, value);
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const toArray = Array.isArray(to) ? to : to ? [to] : [];
  const bccArray = Array.isArray(bcc) ? bcc : bcc ? [bcc] : [];
  const allRecipients = Array.from(new Set([...toArray, ...bccArray]));

  if (allRecipients.length === 0) return;

  const sendPromises = allRecipients.map(async (recipientEmail) => {
    const personalizedHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Inter', -apple-system, sans-serif; background-color: #fafafa; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; border: 1px solid #e5e5e5; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
            .header { padding: 32px 24px; text-align: center; background-color: #111827; }
            .header h1 { margin: 0; font-size: 40px; line-height: 40px; font-weight: 800; color: #ffffff; letter-spacing: -0.02em; text-transform: uppercase; }
            .header span { color: #3b82f6; }
            .content { padding: 40px 32px; color: #374151; font-size: 16px; line-height: 1.6; }
            .footer { padding: 32px 24px; background-color: #111827; text-align: center; }
            .footer-links { margin: 0 0 24px; }
            .footer-links a { color: #60a5fa; text-decoration: none; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; padding: 0 12px; }
            .unsubscribe { margin: 0; font-size: 12px; color: #9ca3af; }
            .unsubscribe a { color: #9ca3af; text-decoration: underline; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>
                <span style="display: inline-block; box-sizing: border-box; width: 28px; height: 28px; border: 4px solid #3b82f6; border-radius: 6px; margin-right: 12px; vertical-align: middle;"></span><span style="vertical-align: middle; color: #ffffff;">TechDaily</span>
              </h1>
            </div>

            <div class="content">
              ${rawHtmlContent}
            </div>

            <div class="footer">
              <div class="footer-links">
                <a href="${baseUrl}/articles">Latest Stories</a>
                <span style="color: #d1d5db;">|</span>
                <a href="${baseUrl}/newsletter">Manage Preferences</a>
              </div>
              <p class="unsubscribe">
                Received this email by mistake? <a href="${baseUrl}/newsletter?type=Unsubscribe&email=${encodeURIComponent(recipientEmail)}">Unsubscribe</a>
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    const textContent = personalizedHtml.replace(/<[^>]*>?/gm, '');

    return transporter.sendMail({
      from: '"Tech Daily" <' + process.env.EMAIL_SENDER + '>',
      to: recipientEmail,
      subject: emailTemplate.subject,
      text: textContent,
      html: personalizedHtml,
    });
  });

  return await Promise.all(sendPromises);
}
