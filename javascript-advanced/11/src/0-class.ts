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

const beth = new User("Beth", 21);
beth.addHobby("Coding");
beth.addHobby("Hiking");
beth.addHobby("Running");

const students: User[] = [adam, beth];

const hobbies = getUniqueHobbies(students);

console.log(hobbies);
