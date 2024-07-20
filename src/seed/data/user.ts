export const user: user_i[]= [
    {
        person_id: "1",
        parish_id: 1,
        Role_id: 1,
        password: "$2b$10$5j7lHV9y6cmER4OyfKXhwuHBEMDSsNERXKLCU74ai0jmf4TAeblqe"
    }
]

export const person_user: person_user_i[]= [{
    id: "1",
    forename: "None",
    surname: "Nobody",
    email: "Noway@nowhere.com",
    birthdate: new Date(),
}]


interface person_user_i{
    id: string,
    forename: string,
    surname: string,
    email: string,
    birthdate: Date
}
interface user_i{
    person_id: string,
    parish_id: number,
    Role_id: number,
    password: string
}