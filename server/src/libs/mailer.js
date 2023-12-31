// /* eslint-disable */

// // config file
// // Credentials for different providers
// // const sendgridCredentials = {
// //   apiKey: 'YOUR_SENDGRID_API_KEY',
// // };

// const logger = require("../logger");

// // const nodemailerCredentials = {
// //   host: 'YOUR_SMTP_HOST',
// //   port: 'YOUR_SMTP_PORT',
// //   auth: {
// //     user: 'YOUR_EMAIL_USER',
// //     pass: 'YOUR_EMAIL_PASSWORD',
// //   },
// // };

// // const mailgunCredentials = {
// //   auth: {
// //     api_key: 'YOUR_MAILGUN_API_KEY',
// //     domain: 'YOUR_MAILGUN_DOMAIN',
// //   },
// // };

// class MailerService {
//   constructor(provider, credentials) {
//     this.provider = provider;
//     this.credentials = credentials;
//     this.initializeTransporter();
//   }

//   initializeTransporter() {
//     switch (this.provider) {
//       case "sendgrid":
//         this.transporter = require("@sendgrid/mail");
//         this.transporter.setApiKey(this.credentials.apiKey);
//         break;
//       case "nodemailer":
//         const nodemailer = require("nodemailer");
//         this.transporter = nodemailer.createTransport(this.credentials);
//         break;
//       case "mailgun":
//         const mailgunTransport = require("nodemailer-mailgun-transport");
//         this.transporter = nodemailer.createTransport(
//           mailgunTransport(this.credentials)
//         );
//         break;
//       default:
//         throw new Error("Unsupported mailer provider");
//     }
//   }

//   async sendEmail({ from, to, subject, text, html }) {
//     const mailOptions = { from, to, subject, text, html };
//     try {
//       const info = await this.transporter.sendMail(mailOptions);
//       logger.info("Email sent:", info);
//       return info;
//     } catch (error) {
//       logger.error("Error sending email:", error);
//       throw error;
//     }
//   }

//   async sendEmailWithTemplate({ from, to, templateId, templateData }) {
//     const mailOptions = { from, to, templateId, templateData };
//     try {
//       const info = await this.transporter.sendMail(mailOptions);
//       logger.info("Email sent:", info);
//       return info;
//     } catch (error) {
//       logger.error("Error sending email:", error);
//       throw error;
//     }
//   }

//   async sendEmailWithAttachment({
//     from,
//     to,
//     subject,
//     text,
//     html,
//     attachments
//   }) {
//     const mailOptions = { from, to, subject, text, html, attachments };
//     try {
//       const info = await this.transporter.sendMail(mailOptions);
//       logger.info("Email sent:", info);
//       return info;
//     } catch (error) {
//       logger.error("Error sending email:", error);
//       throw error;
//     }
//   }

//   async sendEmailWithTemplateAndAttachment({
//     from,
//     to,
//     templateId,
//     templateData,
//     attachments
//   }) {
//     const mailOptions = { from, to, templateId, templateData, attachments };
//     try {
//       const info = await this.transporter.sendMail(mailOptions);
//       logger.info("Email sent:", info);
//       return info;
//     } catch (error) {
//       logger.error("Error sending email:", error);
//       throw error;
//     }
//   }
// }

// // Use cases:
// // Create a mailer service instance for SendGrid
// const sendgridMailer = new MailerService("sendgrid", sendgridCredentials);

// // Create a mailer service instance for Nodemailer
// const nodemailerMailer = new MailerService("nodemailer", nodemailerCredentials);

// // Create a mailer service instance for Mailgun
// const mailgunMailer = new MailerService("mailgun", mailgunCredentials);
