export {};

/* Generic types */

function reverseArr(array: any[]) {
  return array.toReversed();
}

const arrayOfNumbers = [1, 2, 3, 4, 5];
const reversed = reverseArr(arrayOfNumbers); /* We loose type information */

function reverseArray<T>(arr: T[]): T[] {
  return arr.toReversed();
}

const numbers = [1, 2, 3, 4, 5];
const reversedNumbers =
  reverseArray(numbers); /* We have type information preserved */

const strings = ["apple", "banana", "cherry"];
const reversedStrings = reverseArray(strings);

type User = {
  name: string;
  age: number;
};

const users: User[] = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 42 },
];

const reversedUsers = reverseArray<User>(users);
// const reversedUsers2 = reverseArray<User>(strings); /* Ooopsie */

/* Promises */

// const getSomeUser = async (): User => ({ name: "Alice", age: 21 }); /* Ooopsie */

const getUser = async (id: number): Promise<User> => {
  return {
    name: "John Doe",
    age: 42,
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

const merged = merge(
  { id: 1, name: "John Doe" },
  { id: 2, email: "johndoe@example.com" }
);

console.log(merged);

/* Extend constraints */

interface HasAge {
  age: number;
  // age: string;
}

function getAge<T extends HasAge>(user: T): T["age"] {
  return user.age;
}

// getAge({ name: "John" }); /* Ooopsie */
getAge({ name: "John", age: 42 }); /* Ok */

/* Conditional Types */

type IsNumber<T> = T extends number ? true : false;

// const isNum: IsNumber<number> = false; /* Ooopsie */
const isNumber1: IsNumber<number> = true;
const isNumber2: IsNumber<string> = false;

/* keyof */

type Person = {
  name: string;
  age: number;
  location: string;
};

type PersonProperties = keyof Person;
type PersonKeys = "name" | "age" | "location";

const getProperty = <T extends {}, K extends keyof T>(obj: T, key: K): T[K] =>
  obj[key];

getProperty({ name: "name", age: 42 }, "name");
getProperty({ name: "name", age: 42 }, "age");

/* keyof typeof */

const john = {
  id: "abc",
  name: "John Doe",
  age: 42,
  isAdmin: true,
};

type UserKeys = keyof typeof john;

const getUserKeyValue = (
  user: typeof john,
  key: keyof typeof john
): (typeof john)[keyof typeof john] => user[key];

const value = getUserKeyValue(
  { id: "xyz", name: "Adam", age: 42, isAdmin: false },
  "isAdmin"
);

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
