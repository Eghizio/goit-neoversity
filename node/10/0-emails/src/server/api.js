import { Router } from "express";
import chalk from "chalk";
import { EmailSender } from "../EmailSender/EmailSender.js";
import { NodemailerEmailProvider } from "../EmailSender/EmailProvider/NodemailerEmailProvider.js";
import { SendGridEmailProvider } from "../EmailSender/EmailProvider/SendGridEmailProvider.js";
import { EtherealEmailProvider } from "../EmailSender/EmailProvider/EtherealEmailProvider.js";
import { config } from "../config.js";
import { TestEmailProvider } from "../EmailSender/EmailProvider/TestEmailProvider.js";

export const api = Router();

const createEmailController = (emailSender) => async (req, res) => {
  try {
    const {
      recipients,
      subject,
      body: { text, html },
    } = req.body;

    const payload = { recipients, subject, body: { text, html } };
    const result = await emailSender.sendEmail(payload);

    console.log(result);

    return res.json({ result });
  } catch (error) {
    const subject = req.body?.subject;
    console.error(chalk.red("Failed to send email with subject:"), subject);
    console.error(error);

    return res
      .status(500)
      .json({ error: `Failed to send email with subject "${subject}"` });
  }
};

// Nodemailer + SendGrid
api.post(
  "/emails/nodemailer",
  createEmailController(
    new EmailSender(
      new NodemailerEmailProvider(config.SENDGRID_API_KEY),
      config.EMAIL_SENDER
    )
  )
);

// SendGrid
api.post(
  "/emails/sendgrid",
  createEmailController(
    new EmailSender(
      new SendGridEmailProvider(config.SENDGRID_API_KEY),
      config.EMAIL_SENDER
    )
  )
);

// Nodemailer + Ethereal Email
api.post(
  "/emails/ethereal",
  createEmailController(
    new EmailSender(
      new EtherealEmailProvider({
        user: config.ETHEREAL_USER,
        pass: config.ETHEREAL_PASSWORD,
      }),
      config.EMAIL_SENDER
    )
  )
);

// Test implementation
api.post(
  "/emails/test",
  createEmailController(
    new EmailSender(new TestEmailProvider(), config.EMAIL_SENDER)
  )
);
