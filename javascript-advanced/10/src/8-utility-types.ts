export {};

// https://www.typescriptlang.org/docs/handbook/utility-types.html

type User = {
  id: string;
  name: string;
  age: number;
  isAdmin: boolean;
  friends: User[];
};

/* Partial */

const userPartialInformation: Partial<User> = {
  id: "user1",
};

type PartialUser = {
  id?: string;
  name?: string;
  age?: number;
  isAdmin?: boolean;
  friends?: User[];
};

type PartialUser2 = Partial<User>; /* alias */

/* Readonly */

const userReadOnly: Readonly<User> = {
  id: "user1",
  name: "Alice",
  age: 25,
  isAdmin: false,
  friends: [],
};

// userReadOnly.id = "user2"; /* Ooopsie */

/* Pick */

type PickUser = Pick<User, "id" | "name" | "age">;

const userPick: PickUser = { id: "user1", name: "Alice", age: 25 };

/* Omit */

type OmitUser = Omit<User, "isAdmin" | "friends">;

const userOmit: OmitUser = { id: "user1", name: "Alice", age: 25 };

/* Exclude */

type ExcludeKeys = Exclude<"id" | "name" | "age", "name" | "age">;

const userKeysExclude: ExcludeKeys = "id";

/* Extract */

type ExtractKeys = Extract<"id" | "name" | "age", "name" | "age">;

const userKeysExtract: ExtractKeys = "name";

/* Union Types */

type UnionType = "male" | "female" | "other";

let gender: UnionType = "male";

// gender = "invalid"; /* Ooopsie */

/* Record */

type UserRecord = Record<string, User>;

const userRecord: UserRecord = {
  user1: { id: "user1", name: "Alice", age: 25, isAdmin: false, friends: [] },
  user2: { id: "user2", name: "Bob", age: 30, isAdmin: true, friends: [] },
};

type ExtractedKeys = Extract<keyof User, "id" | "name">;
type ExcludedKeys = Exclude<ExtractedKeys, "name">;

type UserId = ExcludedKeys; // "id"

const usersMap: Record<User[UserId], User> = {
  user1: { id: "user1", name: "Alice", age: 25, isAdmin: false, friends: [] },
  user2: { id: "user2", name: "Bob", age: 30, isAdmin: true, friends: [] },
};

/* ReturnType */

function add(x: number, y: number) {
  return x + y;
}

type AddReturnType = ReturnType<typeof add>; // number

let result: AddReturnType;
result = add(42, 2);
// result = "44"; /* Ooopsie */

/* Parameters */

function multiply(x: number, y: number) {
  return x * y;
}

type MultiplyParameters = Parameters<typeof multiply>; // [number, number]
const args: MultiplyParameters = [6, 6];
const res = multiply(...args);

// const args2: MultiplyParameters = ["6", "6"]; /* Ooopsie */
// const res2 = multiply(...args2);

// const args3: MultiplyParameters = [6, 6, 6]; /* Ooopsie */
// const res3 = multiply(...args3);

/* NonNullable */

type Values = string | number | undefined | null;
type NonNullableValue = NonNullable<Values>; // string | number

function getValueOrDefault(
  value: Values,
  defaultValue: NonNullable<Values>
): NonNullableValue {
  return value ?? defaultValue;
}

const result1 = getValueOrDefault(undefined, 42);
const result2 = getValueOrDefault(null, "1337");
const result3 = getValueOrDefault(44, "1337");

console.log({ result1, result2, result3 });
