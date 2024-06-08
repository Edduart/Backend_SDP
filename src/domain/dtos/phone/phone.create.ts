export class CreatePhone{
    constructor(
        public readonly phone_numbre: string,
        public readonly person_id: string,
        public readonly description: string
    ){}
}