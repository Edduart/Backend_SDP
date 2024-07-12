import { StageEntity } from "./stage.entity";



export class academicFieldEntity{
    constructor(
        public id: number,
        public stage: StageEntity,
        public description: string  | null  ,
    ){}

    public static fromObject(object: { [key: string]: any }): academicFieldEntity {
        const { id, stage, description } = object;
        const stage_obj = StageEntity.fromObject(stage);
        return new academicFieldEntity(id, stage_obj, description);
    }
}