import chalk from "chalk";
import { AbstractEmailProvider } from "./AbstractEmailProvider.js";

export class TestEmailProvider extends AbstractEmailProvider {
  constructor() {
    super();
  }

  async sendEmail({ from, to, subject, body: { text, html } }) {
    const payload = { from, to, subject, text, html };

    console.log(chalk.cyan(`[test] Sending email to: ${payload.to}`));

    return { success: true, payload };
  }
}
