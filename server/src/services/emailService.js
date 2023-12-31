import nodemailer from "nodemailer";
import config from "../config/config.js";
import logger from "../libs/logger.js";

class EmailService {
  constructor() {
    this.transport = nodemailer.createTransport(config.email.smtp);
    /* istanbul ignore next */
    if (config.env !== "test") {
      this.transport
        .verify()
        .then(() => logger.info("Connected to email server"))
        .catch(() =>
          logger.warn(
            "Unable to connect to email server. Make sure you have configured the SMTP options in .env"
          )
        );
    }
  }

  /**
   * Send an email
   * @param {string} to
   * @param {string} subject
   * @param {string} text
   * @returns {Promise}
   */
  async sendEmail(to, subject, text) {
    const msg = { from: config.email.from, to, subject, text };
    await this.transport.sendMail(msg);
  }

  /**
   * Send reset password email
   * @param {string} to
   * @param {string} token
   * @returns {Promise}
   */
  async sendResetPasswordEmail(to, token) {
    const subject = "Reset password";
    const resetPasswordUrl = `${config.siteUrls.serverURL}/reset-password?token=${token}`;
    const text = `Dear user,
    To reset your password, click on this link: ${resetPasswordUrl}
    If you did not request any password resets, then ignore this email.`;
    await this.sendEmail(to, subject, text);
  }

  /**
   * Send verification email
   * @param {string} to
   * @param {string} token
   * @returns {Promise}
   */
  async sendVerificationEmail(to, token) {
    const subject = "Email Verification";
    const verificationEmailUrl = `${config.siteUrls.serverURL}/verify-email?token=${token}`;
    const text = `Dear user,
    To verify your email, click on this link: ${verificationEmailUrl}
    If you did not create an account, then ignore this email.`;
    await this.sendEmail(to, subject, text);
  }
}

export default EmailService;
