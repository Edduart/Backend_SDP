export class InstructionEntity {
    constructor(
        public professor_id:    string |   null,
        public subject_id:      number,
        public Academic_term_id:   number,
      ) {}
      public static fromObject(object: { [key: string]: any }): InstructionEntity {
        let {professor_id,subject_id,academic_term_id,} = object;
        return new InstructionEntity(professor_id,subject_id,academic_term_id)
      }
}