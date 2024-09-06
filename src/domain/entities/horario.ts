export class HorarioEntity{
    constructor(
        public id:              number,
        public Curso:           string,
        public link?:           string,
    ){}
    public static fromObject(object: { [key: string]: any }): HorarioEntity {
        const { id, Curso, link } = object;
        return new HorarioEntity(id, Curso, link);
    }


}