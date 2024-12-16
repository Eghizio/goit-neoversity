export {};

class User {
  readonly name: string;
  private age: number;
  private email: string;

  constructor(name: string, age: number, email: string) {
    this.name = name;
    this.age = age;
    this.email = email;
  }

  /* public by default */
  setAge(newAge: number) {
    if (newAge <= this.age) {
      console.warn("\x1b[31m%s\x1b[0m", `${this.name} can't get any younger.`);
      return;
    }

    this.age = newAge;
  }

  public receiveEmail(sender: User, message: string) {
    const footer = this.createEmailFooter(sender.name);

    const emailBody = `${message}\n${footer}`;

    console.log("\x1b[36m%s\x1b[0m", `\nSending email to ${this.email}:`);
    console.log(emailBody);
  }

  private createEmailFooter(senderName: string): string {
    const sentDate = new Date().toLocaleString();

    return `Sent by ${senderName} on ${sentDate}`;
  }
}

const adam = new User("Adam", 42, "adam@adam.com");
// console.log(adam.email); /* Ooopsie */

const beth = new User("Beth", 21, "beth@beth.com");
beth.setAge(16);
// beth.createEmailFooter(beth.name); /* Ooopsie */

adam.receiveEmail(beth, "Hi Adam, how are you?");
