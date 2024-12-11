export {};

/* Interfaces */

interface User {
  id: string;
  name: string;
  // age?: number;
}

/* Interface merging */
interface User {
  age?: number;
  level: number;
}

const user: User = {
  id: "user1",
  name: "John Doe",
  level: 10,
};

const isUserAllowed = (user: User) => user.level > 10;

/* Extending Interfaces */

interface Animal {
  breathe(): void;
}

interface Dog extends Animal {
  bark(): void;
}

const reksio: Dog = {
  breathe(): void {
    console.log("Reksio is breathing.");
  },
  bark(): void {
    console.log("Reksio is barking.");
  },
};

/* Mixing Types & Interfaces */

type AnimalType = {
  breathe(): void;
};

interface Cat {
  color: string;
}

const filemon: Cat & AnimalType = {
  color: "black",
  breathe(): void {
    console.log("Filemon is breathing.");
  },
};

/* Implementing Interfaces */

type Recipient = {
  id: string;
  email: string;
  phone: string;
};

interface Sender {
  send(recipients: Recipient[], message: string): void;
}

class EmailSender implements Sender {
  send(recipients: Recipient[], message: string): void {
    console.log(`Sending Email to ${recipients.length} recipients: ${message}`);
  }
}

class SmsSender implements Sender {
  send(recipients: Recipient[], message: string): void {
    console.log(`Sending SMS to ${recipients.length} recipients: ${message}`);
  }
}

const sendReminder = (
  recipients: Recipient[],
  sender: Sender = new SmsSender()
) => {
  sender.send(recipients, "Reminder about something important.");

  console.log(`Sent to: ${recipients.map((r) => r.id).join(", ")}`);
};

const recipients: Recipient[] = [
  {
    id: "recipient1",
    email: "recipient1@example.com",
    phone: "1234567890",
  },
  {
    id: "recipient2",
    email: "recipient2@example.com",
    phone: "9876543210",
  },
];

sendReminder(recipients, new SmsSender());
sendReminder(recipients, new EmailSender());

class FaxSender implements Sender {
  send(recipients: Recipient[], message: string): void {
    console.log(`Sending Fax to ${recipients.length} recipients: ${message}`);
  }
}

sendReminder(recipients, new FaxSender());

/* Multiple interfaces */

interface Swimable {
  swim(): void;
}

interface Flyable {
  fly(): void;
}

class Duck implements Swimable, Flyable {
  swim(): void {
    throw new Error("Method not implemented.");
  }
  fly(): void {
    throw new Error("Method not implemented.");
  }
}

/* Writing code for the Duck that is not event instantiated yet. */
const quackQuack = (duck: Duck) => {
  duck.fly();
  duck.swim();
};
