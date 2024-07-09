
export class SubjectEntity {
    constructor(
      public id:            number                  ,
      public course_id:     number                  ,
      public description:   string                  ,
      public status:        boolean                 ,
      public precedent:     SubjectEntity   | null  ,
      public semester:      number          | null  ,

    ) {}
  
    public static fromObject(object: { [key: string]: any }): SubjectEntity {
      const { id, course_id, description, status, precedent, semester } = object;
      let prec = null;
      if(precedent != null){
        prec = this.fromObject(precedent);
      }

      return new SubjectEntity(id, course_id, description, status,prec, semester );
    }
  }
  