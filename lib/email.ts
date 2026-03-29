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

    const uniqueTag = `v=${Date.now()}`;
    const personalizedHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #09090b; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
            .wrapper { width: 100%; table-layout: fixed; background-color: #09090b; padding: 40px 0; }
            .container { width: 100%; margin: 0 auto; background-color: transparent; }
            .header { padding: 0 5% 40px; text-align: left; }
            .header-content { display: inline-block; border-bottom: 1px solid #27272a; padding-bottom: 24px; width: 100%; }
            .header h1 { margin: 0; font-size: 44px; line-height: 44px; font-weight: 800; color: #ffffff; letter-spacing: -0.02em; text-transform: uppercase; }
            .content { padding: 0 5%; color: #d4d4d8; font-size: 16px; line-height: 1.7; text-align: left; }
            .content h2 { margin: 0 0 16px; font-size: 28px; line-height: 1.3; font-weight: 800; color: #ffffff; letter-spacing: -0.02em; }
            .content p { margin: 0 0 24px; }
            .footer { padding: 48px 5%; text-align: left; margin-top: 48px; }
            .footer-links { margin: 0 0 24px; }
            .footer-links a { color: #f4f4f5; text-decoration: none; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; padding-right: 24px; display: inline-block; }
            .unsubscribe { margin: 0; font-size: 13px; color: #71717a; line-height: 1.6; }
            .unsubscribe a { color: #a1a1aa; text-decoration: underline; text-underline-offset: 2px; }
            @media only screen and (max-width: 620px) {
              .column { display: block !important; width: 100% !important; padding-right: 0 !important; }
              .mobile-img-container { height: 240px !important; margin-bottom: 24px !important; }
              .mobile-auto-height { height: auto !important; }
              .mobile-padding-bottom { padding-bottom: 8px !important; }
              .mobile-text-center { text-align: center !important; }
            }
          </style>
        </head>
        <body>
          <div style="display: none; height: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #ffffff; opacity: 0; mso-hide: all;">
            ${replacements.preheader || 'Your daily intelligence briefing from TechDaily.'}
            &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
            [ID: ${Date.now()}_${Math.random().toString(36).substring(7)}]
          </div>
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
                <hr style="border: 0; border-top: 1px solid #27272a; margin: 0 0 48px 0;">
                <div class="footer-links">
                  <a href="${baseUrl}/articles?${uniqueTag}">Latest Stories</a>
                  <a href="${baseUrl}/newsletter?type=${currentType}&email=${encodeURIComponent(recipientEmail)}&${uniqueTag}">Manage Preferences</a>
                </div>
                ${
                  slug === 'unsubscribed-confirmation'
                    ? `
                <p class="unsubscribe">
                  You are receiving this one-time notification as a confirmation of your recent account changes.<br>
                  Changed your mind? <a href="${baseUrl}/newsletter?type=Daily&email=${encodeURIComponent(recipientEmail)}&${uniqueTag}">Rejoin the network</a> at any time.<br>
                  TechDaily 💌 Architected by DevRGD
                </p>`
                    : `
                <p class="unsubscribe">
                  You are receiving this premium briefing because you subscribed to TechDaily.<br>
                  Changed your mind? <a href="${baseUrl}/newsletter?type=Unsubscribe&email=${encodeURIComponent(recipientEmail)}&${uniqueTag}">Unsubscribe</a>.<br>
                  TechDaily 💌 Architected by DevRGD
                </p>`
                }
              </div>
            </div>
          </center>
        </body>
      </html>
    `;

    const textContent = personalizedHtml.replace(/<[^>]*>?/gm, '');

    const subjectTag = `[${new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}]`;
    const subjectText = emailTemplate.subject.includes('{{date}}')
      ? emailTemplate.subject.replace('{{date}}', replacements.date || '')
      : `${emailTemplate.subject}${replacements.date ? ` — ${replacements.date}` : ''} ${subjectTag}`;

    return transporter.sendMail({
      from: '"TechDaily" <' + (process.env.EMAIL_SENDER || process.env.EMAIL_USER) + '>',
      to: recipientEmail,
      subject: subjectText,
      text: textContent,
      html: personalizedHtml,
    });
  });

  return await Promise.all(sendPromises);
}
