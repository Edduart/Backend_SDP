export class HorarioEntity{
    constructor(
        public ID:              number,
        public Curso:           string,
        public link?:           string,
    ){}
    public static fromObject(object: { [key: string]: any }): HorarioEntity {
        const { ID, Curso, link } = object;
        return new HorarioEntity(ID, Curso, link);
    }


}