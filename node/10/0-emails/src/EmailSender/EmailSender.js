import { AbstractEmailProvider } from "./EmailProvider/AbstractEmailProvider.js";

export class EmailSender {
  #provider;
  #sender;

  constructor(emailProvider, sender) {
    if (!(emailProvider instanceof AbstractEmailProvider)) {
      throw new TypeError("Invalid email provider.");
    }

    this.#provider = emailProvider;
    this.#sender = sender;
  }

  async sendEmail({ recipients, subject, body: { text, html } }) {
    const from = this.#sender;
    const to = recipients;

    const payload = { from, to, subject, body: { text, html } };

    const response = await this.#provider.sendEmail(payload);
    return response;
  }
}
