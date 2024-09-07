import { SubjectEntity } from "./subject.entity";

export class InstructionEntity {
    constructor(
        public professor_id:        string |   null,
        public subject_id:          number,
        public academic_term_id:    number,
        public subject?:           string
      ) {}
      public static fromObject(object: { [key: string]: any }): InstructionEntity {
        let {professor_id,subject_id,academic_term_id} = object;
        return new InstructionEntity(professor_id,subject_id,academic_term_id)
      }
}