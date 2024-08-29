export const person: Person[] = [
  {
    id: "V-1",
    forename: "None",
    surname: "Nobody",
    email: "Noway@nowhere.com",
    birthdate: new Date(),
  },
];

interface Person {
  id: string;
  forename: string;
  surname: string;
  email: string;
  birthdate: Date;
}
