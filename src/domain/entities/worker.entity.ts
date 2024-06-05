import { PersonEntity } from "./person.entity";


export class WorkerEntity{
    constructor(
        public person: PersonEntity,
    ){

    }
}