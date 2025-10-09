/* Abstract Class */
export class AbstractEmailProvider {
  constructor() {
    if (new.target === AbstractEmailProvider) {
      throw new TypeError("Cannot instantiate abstract class.");
    }
  }

  async sendEmail({ from, to, subject, body: { text, html } }) {
    throw new NotImplementedError(
      "Abstract method. Subclasses must implement this method."
    );
  }
}

export class NotImplementedError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotImplementedError";
  }
}
