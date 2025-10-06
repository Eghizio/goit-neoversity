import nodemailer from "nodemailer";
import chalk from "chalk";
import { AbstractEmailProvider } from "./AbstractEmailProvider.js";

/* Nodemailer + Ethereal Email https://ethereal.email/ */
export class EtherealEmailProvider extends AbstractEmailProvider {
  #client;
  #auth;

  constructor(etherealAuth) {
    super();

    this.#auth = etherealAuth;
    this.#client = null;
  }

  async sendEmail({ from, to, subject, body: { text, html } }) {
    if (!this.#client) {
      await this.#init();
    }

    const payload = { from, to, subject, text, html };
    const response = await this.#client.sendMail(payload);
    return response;
  }

  async #init() {
    const auth = await this.#createEtherealAuth();
    console.log({ auth });
    const config = this.#createTransportConfig(auth);

    this.#client = nodemailer.createTransport(config);
  }

  #createTransportConfig(auth) {
    return {
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth,
    };
  }

  async #createEtherealAuth() {
    const etherealAuth = this.#auth;
    if (etherealAuth.user && etherealAuth.pass) return etherealAuth;

    const etherealAccount = await nodemailer.createTestAccount();

    console.log(
      chalk.magenta(`Created new Ethereal account:`),
      etherealAccount
    );

    this.#auth = etherealAccount;

    return etherealAccount;
  }
}
