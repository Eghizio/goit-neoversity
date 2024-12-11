export {};

/* Generic types */

function reverseArray<T>(arr: T[]): T[] {
  return arr.reverse();
}

const numbers = [1, 2, 3, 4, 5];
const reversedNumbers = reverseArray(numbers);

const strings = ["apple", "banana", "cherry"];
const reversedStrings = reverseArray(strings);

/* Promises */

const getUser = async (
  id: number
): Promise<{ name: string; email: string }> => {
  return {
    name: "John Doe",
    email: "johndoe@example.com",
  };
};

const getUserName = async (userId: number): Promise<string> => {
  const user = await getUser(userId);
  return user.name;
};

/* Multiple Generics */
const merge = <A, B>(first: A, second: B): A & B => {
  return { ...first, ...second };
};

const merged = merge({ name: "John Doe" }, { email: "johndoe@example.com" });

/* Extend constraints */

interface HasAge {
  age: number;
}

function getAge<T extends HasAge>(user: T): T["age"] {
  return user.age;
}

// getAge({ name: "John" }); /* Ooopsie */
getAge({ name: "John", age: 42 }); /* Ok */

/* keyof */

type Person = {
  name: string;
  age: number;
  location: string;
};

type PersonProperties = keyof Person;

const getProperty = <T, K extends keyof T>(obj: T, key: K): T[K] => obj[key];

getProperty({ name: "name", age: 42 }, "name");

/* Generic Classes */

class Store<T> {
  private store: Set<T>;

  constructor() {
    this.store = new Set();
  }

  getItems(): Set<T> {
    return this.store;
  }

  save(item: T) {
    this.store.add(item);
  }

  remove(item: T) {
    this.store.delete(item);
  }
}

const numbersStore = new Store<number>();
numbersStore.save(1); /* Ok */
// numbersStore.save("2"); /* Ooopsie */
const numberItems = numbersStore.getItems();

const stringsStore = new Store<string>();
// stringsStore.save(1); /* Ooopsie */
stringsStore.save("2"); /* Ok */
const stringItems = stringsStore.getItems();
