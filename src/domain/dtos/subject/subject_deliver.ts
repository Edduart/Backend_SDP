import { academicFieldEntity, SubjectEntity } from "../..";

export class SubjectDeliver {
    constructor(
      public id:                number                ,
      public course_id:         number                ,
      public description:       string                ,
      public status:            boolean               ,
      public precedent:         SubjectEntity | null  ,
      public semester:          number                ,
      public academic_field_id: academicFieldEntity   ,
      public homologada:        boolean               ,
      public instruction?:       instruction_dto[]    ,
    ) {}
  
    public static fromObject(object: { [key: string]: any }): SubjectDeliver {
      const { id, course_id, description, status, subject, semester, academic_field,homologada } = object;
      const academic_obj = academicFieldEntity.fromObject(academic_field);
      
      let prec = null;
      if(subject != null){
        prec = this.fromObject(subject);
      }

      return new SubjectDeliver(id, course_id, description, status,prec, semester, academic_obj, homologada);
    }
  }
  export class instruction_dto{
    constructor(
        public professor_id:        string| null,
        public subject_id:          number,
        public academic_term_id:    number,
    ){}
    public static fromObject(object: { [key: string]: any }): instruction_dto {
        const { professor_id, subject_id, academic_term_id} = object;
        return new instruction_dto(professor_id, subject_id, academic_term_id);
    }

  }