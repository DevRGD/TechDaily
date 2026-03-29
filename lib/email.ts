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

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://techdaily-devrgd.vercel.app';

  const toArray = Array.isArray(to) ? to : to ? [to] : [];
  const bccArray = Array.isArray(bcc) ? bcc : bcc ? [bcc] : [];
  const allRecipients = Array.from(new Set([...toArray, ...bccArray]));

  if (allRecipients.length === 0) return;

  const sendPromises = allRecipients.map(async (recipientEmail) => {
    const typeMapping: Record<string, string> = {
      'daily-dispatch': 'Daily',
      'weekly-pulse': 'Weekly',
      'monthly-pulse': 'Monthly',
      'subscribed-confirmation': 'Daily',
      'unsubscribed-confirmation': 'Unsubscribe',
      'otp-verification': replacements.preference || 'Daily',
    };

    const currentType = typeMapping[slug] || 'Daily';

    const personalizedHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #09090b; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
            .wrapper { width: 100%; table-layout: fixed; background-color: #09090b; padding: 40px 0 60px 0; }
            .container { max-width: 600px; margin: 0 auto; width: 100%; background-color: transparent; }
            .header { padding: 0 24px 40px; text-align: left; }
            .header-content { display: inline-block; border-bottom: 1px solid #27272a; padding-bottom: 24px; width: 100%; }
            .header h1 { margin: 0; font-size: 44px; line-height: 44px; font-weight: 800; color: #ffffff; letter-spacing: -0.02em; text-transform: uppercase; }
            .content { padding: 0 24px; color: #d4d4d8; font-size: 16px; line-height: 1.7; text-align: left; }
            .content h2 { margin: 0 0 16px; font-size: 28px; line-height: 1.3; font-weight: 800; color: #ffffff; letter-spacing: -0.02em; }
            .content p { margin: 0 0 24px; }
            .footer { padding: 40px 24px; text-align: left; margin-top: 48px; border-top: 1px solid #27272a; }
            .footer-links { margin: 0 0 24px; }
            .footer-links a { color: #f4f4f5; text-decoration: none; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; padding-right: 24px; display: inline-block; }
            .unsubscribe { margin: 0; font-size: 13px; color: #71717a; line-height: 1.6; }
            .unsubscribe a { color: #a1a1aa; text-decoration: underline; text-underline-offset: 2px; }
          </style>
        </head>
        <body>
          <center class="wrapper">
            <div class="container">
              <div class="header">
                <div class="header-content">
                  <h1>
                  <table cellpadding="0" cellspacing="0" border="0" style="margin: 0; padding: 0;">
                    <tr>
                      <td valign="middle" style="padding-right: 14px; line-height: 0;">
                        <div style="box-sizing: border-box; width: 38px; height: 38px; border: 6px solid #3b82f6; border-radius: 6px;"/>
                      </td>
                      <td valign="middle">
                        <span style="color: #ffffff;">TechDaily</span>
                      </td>
                    </tr>
                  </table>
                  </h1>
                </div>
              </div>

              <div class="content">
                ${rawHtmlContent}
              </div>

              <div class="footer">
                <div class="footer-links">
                  <a href="${baseUrl}/articles">Latest Stories</a>
                  <a href="${baseUrl}/newsletter?type=${currentType}&email=${encodeURIComponent(recipientEmail)}">Manage Preferences</a>
                </div>
                ${
                  slug === 'unsubscribed-confirmation'
                    ? `
                <p class="unsubscribe">
                  You are receiving this one-time notification as a confirmation of your recent account changes.<br>
                  Changed your mind? <a href="${baseUrl}/newsletter?type=Daily&email=${encodeURIComponent(recipientEmail)}">Rejoin the network</a> at any time.
                </p>`
                    : `
                <p class="unsubscribe">
                  You are receiving this premium briefing because you subscribed to TechDaily.<br>
                  Changed your mind? <a href="${baseUrl}/newsletter?type=Unsubscribe&email=${encodeURIComponent(recipientEmail)}">Unsubscribe</a>.
                </p>`
                }
              </div>
            </div>
          </center>
          <div style="display: none; white-space: nowrap; font-size: 1px; color: #09090b; line-height: 0;">
            ${Date.now()}_${Math.random().toString(36).substring(7)}
          </div>
        </body>
      </html>
    `;

    const textContent = personalizedHtml.replace(/<[^>]*>?/gm, '');

    return transporter.sendMail({
      from: '"TechDaily" <' + process.env.EMAIL_SENDER + '>',
      to: recipientEmail,
      subject: emailTemplate.subject,
      text: textContent,
      html: personalizedHtml,
    });
  });

  return await Promise.all(sendPromises);
}
