export const user: User[]= [
    {
        person_id: "V-1",
        parish_id: 1,
        Role_id: 1,
        password: "$2b$10$5j7lHV9y6cmER4OyfKXhwuHBEMDSsNERXKLCU74ai0jmf4TAeblqe"
    }
]
interface User{
    person_id: string,
    parish_id: number,
    Role_id: number,
    password: string
}