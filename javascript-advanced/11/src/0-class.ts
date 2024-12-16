export {};

class User {
  readonly id: string;
  readonly name: string;
  readonly age: number;
  readonly hobby: string[];

  constructor(name: string, age: number) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.age = age;
    this.hobby = [];
  }

  public addHobby(hobby: string) {
    this.hobby.push(hobby);
  }
}

const getUniqueHobbies = (users: User[]): string[] => {
  const allHobbies = users.flatMap((user) => user.hobby);

  const uniqueHobbies = [...new Set(allHobbies)];

  return uniqueHobbies;
};

const adam = new User("Adam", 42);
adam.addHobby("Coding");
adam.addHobby("Cooking");

const beth = new User("Adam", 21);
adam.addHobby("Coding");
adam.addHobby("Hiking");
adam.addHobby("Running");

const students: User[] = [adam, beth];

const hobbies = getUniqueHobbies(students);

console.log(hobbies);
