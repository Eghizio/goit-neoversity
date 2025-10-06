import chalk from "chalk";

class Config {
  #_PORT;
  #_SENDGRID_API_KEY;
  #_EMAIL_SENDER;
  #_ETHEREAL_USER;
  #_ETHEREAL_PASSWORD;

  constructor() {
    this.#_PORT = this.#normalizePort(this.#getEnv("PORT", "3001"));

    this.#_SENDGRID_API_KEY = this.#getEnv("SENDGRID_API_KEY");
    this.#_EMAIL_SENDER = this.#getEnv("EMAIL_SENDER");

    this.#_ETHEREAL_USER = this.#getEnv("ETHEREAL_USER");
    this.#_ETHEREAL_PASSWORD = this.#getEnv("ETHEREAL_PASSWORD");

    console.log(chalk.magenta("Config loaded."));
  }

  get PORT() {
    return this.#_PORT;
  }

  get SENDGRID_API_KEY() {
    return this.#_SENDGRID_API_KEY;
  }

  get EMAIL_SENDER() {
    return this.#_EMAIL_SENDER;
  }

  get ETHEREAL_USER() {
    return this.#_ETHEREAL_USER;
  }

  get ETHEREAL_PASSWORD() {
    return this.#_ETHEREAL_PASSWORD;
  }

  #getEnv(name, defaultValue) {
    const value = process.env[name];

    if (!value) {
      if (defaultValue) return defaultValue;
      throw new Error(`Environment variable ${name} is not set.`);
    }

    return value;
  }

  #normalizePort(port) {
    const parsedPort = parseInt(port, 10);

    if (isNaN(parsedPort)) {
      throw new Error(`Invalid port of "${port}"`);
    }

    const minPort = 0;
    const maxPort = 65_535;

    if (parsedPort < minPort || parsedPort > maxPort) {
      throw new Error(`Port "${parsedPort}" out of range.`);
    }

    return parsedPort;
  }
}

export const config = new Config();
