import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  auth: { user: process.env.SMTP_USERNAME, pass: process.env.SMTP_PASSWORD }
});

export async function sendEmail(to: string, subject: string, text: string) {
  if (!process.env.SMTP_HOST) return;
  await transporter.sendMail({ from: process.env.EMAIL_FROM, to, subject, text });
}
