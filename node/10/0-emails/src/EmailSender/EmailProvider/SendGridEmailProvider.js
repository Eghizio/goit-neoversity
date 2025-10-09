import sendgridMail from "@sendgrid/mail";
import { AbstractEmailProvider } from "./AbstractEmailProvider.js";

export class SendGridEmailProvider extends AbstractEmailProvider {
  #client;

  constructor(apiKey) {
    super();

    sendgridMail.setApiKey(apiKey);
    this.#client = sendgridMail;
  }

  async sendEmail({ from, to, subject, body: { text, html } }) {
    const payload = { from, to, subject, text, html };
    const response = await this.#client.send(payload);
    return response;
  }
}
