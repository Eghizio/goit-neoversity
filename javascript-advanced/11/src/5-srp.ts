import { Colors } from "./colors";

export {};
/* SOLID - Single Responsibility Principle */

// /* Bad */
// class BadUser {
//   constructor(public name: string, public email: string) {}

//   sendEmail(recipient: BadUser, subject: string, body: string) {
//     const emailFooter = this.createEmailFooter(this);

//     const fullEmailBody = `\n${body}\n${emailFooter}`;

//     console.log(
//       Colors.Cyan,
//       `Sending email to ${recipient.email}:`,
//       fullEmailBody
//     );
//   }

//   private createEmailFooter(sender: BadUser) {
//     const sentDate = new Date().toLocaleString();
//     return `Sent by ${sender.name} on ${sentDate}`;
//   }
// }

// const adam = new BadUser("Adam", "adam@dean.com");
// const beth = new BadUser("Beth", "beth@student.com");

// adam.sendEmail(beth, "Homework", "You have a new Homework assignment.");

/* Okay */
class User {
  constructor(public name: string, public email: string) {}
}

class OkayEmailService {
  sendEmail(sender: User, recipient: User, subject: string, body: string) {
    const emailFooter = this.createEmailFooter(sender);

    const fullEmailBody = `\n${body}\n${emailFooter}`;

    console.log(Colors.Cyan, `Sending email to ${recipient.email}:`);
    console.log(Colors.Green, subject, fullEmailBody);
  }

  private createEmailFooter(sender: User) {
    const sentDate = new Date().toLocaleString();
    return `Sent by ${sender.name} on ${sentDate}`;
  }
}

// const adam = new User("Adam", "adam@dean.com");
// const beth = new User("Beth", "beth@student.com");

// new OkayEmailService().sendEmail(
//   adam,
//   beth,
//   "Homework",
//   "You have a new Homework assignment."
// );

/* Better */
class Email {
  constructor(
    public sender: User,
    public subject: string,
    public body: string
  ) {
    this.body = this.constructEmailBody(sender, body);
  }

  private constructEmailBody(user: User, body: string): string {
    const emailFooter = this.constructEmailFooter(user);
    const fullEmailBody = `\n${body}\n${emailFooter}`;
    return fullEmailBody;
  }

  private constructEmailFooter(sender: User): string {
    const sentDate = new Date().toLocaleString();
    return `Sent by ${sender.name} on ${sentDate}`;
  }
}

class EmailService {
  sendEmail(email: Email, recipients: User[]) {
    const recipientsEmails = recipients.map((r) => `<${r.email}>`).join(",\n");

    console.log(Colors.Cyan, `Sending email to:\n${recipientsEmails}\n`);
    console.log(Colors.Green, email.subject, email.body);
  }
}

const adam = new User("Adam", "adam@dean.com");
const beth = new User("Beth", "beth@student.com");
const cecil = new User("Cecil", "cecil@student.com");

const email = new Email(
  adam,
  "Homework",
  "You have a new Homework assignment."
);

new EmailService().sendEmail(email, [beth, cecil]);
