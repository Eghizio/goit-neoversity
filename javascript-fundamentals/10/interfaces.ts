
function logNumber(num: number) {
    console.log(num);
}

// logNumber("42");
// logNumber(42);


interface User {
    name: string;
    phone: number;
    email: string;
}

const adam: User = { name: "Abc", phone: 123, email: "abc" };

interface Student {
    // name: string;
    // phone: number;
    // email: string;
    // unusedProperty: null;
    university: string;
    subjects: string[];
    friends: User[];

    learn(): void;
    sleep: () => void;
}

class X implements User, Student {
    name: string;
    phone: number;
    email: string;

    university: string = "GoIT University";
    subjects: string[] = ["Math", "Computer Science", "Physical Education"];
    friends: User[] = [
        { name: "JS", phone: 777, email: "ts@js.esm" }
    ];

    constructor(name: string, phone: number, email: string) {
        this.name = name;
        this.phone = phone;
        this.email = email;
    }
    
    learn(): void {
        console.log("Learning...");
    }

    sleep = () => console.log("ZZzzz..");
}


// const logUserDetails = (someUser: User) => {
const logUserDetails = ({ name, email, phone }: User) => {
    // console.log(someUser.name);
    // console.log(someUser.email);
    // console.log(someUser.phone);
    // // console.log(someUser.dupa);

    console.log(name);
    console.log(email);
    console.log(phone);
};


logUserDetails({ email: "abc@abc.com", name: "Abc", phone: 321 });


const user = { email: "abc@abc.com", name: "xyz", phone: 123 };
const anotherUser = { email: "xyz@abc.com", name: "dsa", phone: 521 };

logUserDetails(user);
logUserDetails(anotherUser);

enum Options {
    A = "A",
    B = "B",
    C = "C",
    D = "D"
}

// const renderOption = (selectElement: HTMLSelectElement, option: Options) => {
//     const opt = document.createElement("option");
//     opt.value = option;
//     opt.textContent = option;

//     selectElement.append(opt);
// };

// // renderOption(document.createElement("a"), Options.A);
// renderOption(document.createElement("select"), Options.A);
