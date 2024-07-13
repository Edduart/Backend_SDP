import { academicFieldEntity } from "./academic.field";

export class SubjectEntity {
    constructor(
      public id:                number                ,
      public course_id:         number                ,
      public description:       string                ,
      public status:            boolean               ,
      public precedent:         SubjectEntity | null  ,
      public semester:          number                ,
      public academic_field_id: academicFieldEntity   ,
      public homologada:        boolean               ,
    ) {}
  
    public static fromObject(object: { [key: string]: any }): SubjectEntity {
      const { id, course_id, description, status, subject, semester, academic_field,homologada } = object;
      const academic_obj = academicFieldEntity.fromObject(academic_field);
      
      let prec = null;
      if(subject != null){
        prec = this.fromObject(subject);
      }

      return new SubjectEntity(id, course_id, description, status,prec, semester, academic_obj, homologada);
    }
  }
  