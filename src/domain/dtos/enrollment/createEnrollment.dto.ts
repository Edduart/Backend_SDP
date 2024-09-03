export class CreateEnrollmentDto {
  constructor(
    public seminarian_id: string,
    public subject_id: number[],
    public academic_term_id: number //public status: number
  ) {}

  static create(props: {
    [key: string]: any;
  }): [object[]?, CreateEnrollmentDto?] {
    let { seminarian_id, subject_id, academic_term_id } = props;
    let validationErrors: ValidationError[] = [];

    console.log({ props });

    // TODO reWork validations

    if (!seminarian_id) {
      validationErrors.push({
        field: "seminarian_id",
        message: "seminarian_id is required!",
      });
    } else if (!/^(V|E)-\d{1,18}$/.test(seminarian_id)) {
      validationErrors.push({
        field: "seminarian_id",
        message: "Seminarian_id must follows this format: V-xxxxxx!",
      });
    }
    if (!Array.isArray(subject_id)) {
      validationErrors.push({
        field: "subject_id",
        message: "subject_id is should be a valid array!",
      });
    }
    if (Array.isArray(subject_id)) {
      console.log("es array");
      if (subject_id.length == 0) {
        validationErrors.push({
          field: "subject_id",
          message: "subject_id is required!",
        });
      } else {
        subject_id.forEach((element: any) => {
          if (
            Number.isNaN(element) ||
            !Number.isInteger(element) ||
            element <= 0
          ) {
            validationErrors.push({
              field: "subject_id",
              message: "subject_id must be a valid array of numbers > to 0!",
            });
          }
        });
      }
    }

    if (!academic_term_id) {
      validationErrors.push({
        field: "academic_term_id",
        message: "academic_term_id is required!!",
      });
    } else if (
      Number.isNaN(academic_term_id) ||
      !Number.isInteger(academic_term_id) ||
      academic_term_id <= 0
    ) {
      validationErrors.push({
        field: "academic_term_id",
        message: "academic_term_id must be a valid ID!",
      });
    }

    if (validationErrors.length > 0) {
      console.error("CreateEnrollmentDto", { validationErrors });
      return [validationErrors];
    }
    return [
      undefined,
      new CreateEnrollmentDto(seminarian_id, subject_id, academic_term_id),
    ];
  }
}

interface ValidationError {
  field: string;
  message: string;
}

export interface SubjectAllowToEnroll {
  seminarian_id: string;
  stage: string;
  course?: {
    course?: string;
    subject?: {
      id: number;
      name: string;
      semester: number;
    }[];
  }[];
}

export interface SubjectAllowToEnrollEquivalency {
  seminarian_id: string;
  stage: {
    name: string;
    course?: {
      course?: string;
      subject?: {
        id: number;
        name: string;
        semester: number;
      }[];
    }[];
  }[];
}
