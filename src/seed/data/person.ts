export const person: Person[] = [
  {
    id: "1",
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
