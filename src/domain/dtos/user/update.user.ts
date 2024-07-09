import { CreateDegree } from "../..";

export class UpdateUser{
    constructor(
        public readonly person_id: string,
        public readonly degree: CreateDegree[]| undefined,
        public readonly parish_id: number,
        public role: number,
        public password?: string,
    ){}
}