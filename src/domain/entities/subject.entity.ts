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
      const { id, course_id, description, status, precedent, semester, academic_field_id,homologada } = object;
      const academic_obj = academicFieldEntity.fromObject(academic_field_id);
      let prec = null;
      if(precedent != null){
        prec = this.fromObject(precedent);
      }

      return new SubjectEntity(id, course_id, description, status,prec, semester, academic_obj, homologada);
    }
  }
  