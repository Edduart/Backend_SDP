import { CreateDegree } from "../..";

export class UpdateUserDto{
    constructor(
        public readonly person_id: string,
        public readonly status: number,
        public readonly degree: CreateDegree[]| undefined,
        public readonly parish_id: number,
        public role: number,
        public password?: string,
    ){}

}