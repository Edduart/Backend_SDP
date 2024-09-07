import { envs } from "../../../config/envs";

const minimalScore: number = envs.MINIMAL_GRADE * 10;

export class CreateEnrollmentByEquivalenceDto {
  constructor(
    public seminarian_id: string,
    public subject_id: number,
    public subject_score: number
  ) {}

  static create(props: {
    [key: string]: any;
  }): [object[]?, CreateEnrollmentByEquivalenceDto?] {
    let { seminarian_id, subject_id, subject_score } = props;
    let validationErrors: ValidationError[] = [];

    console.log({ props });

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

    if (!subject_id) {
      validationErrors.push({
        field: "subject_id",
        message: "subject_id is required!!",
      });
    } else if (
      Number.isNaN(subject_id) ||
      !Number.isInteger(subject_id) ||
      subject_id <= 0
    ) {
      validationErrors.push({
        field: "subject_id",
        message: `subject_id must be a valid number ID`,
      });
    }

    if (!subject_score) {
      validationErrors.push({
        field: "subject_score",
        message: "subject_score is required!!",
      });
    } else if (
      Number.isNaN(subject_score) ||
      subject_score < minimalScore ||
      subject_score > 100
    ) {
      validationErrors.push({
        field: "subject_score",
        message: `subject_score must be a valid number between ${minimalScore} and 100!`,
      });
    }

    if (validationErrors.length > 0) {
      console.error("CreateEnrollmentDto", { validationErrors });
      return [validationErrors];
    }
    return [
      undefined,
      new CreateEnrollmentByEquivalenceDto(
        seminarian_id,
        subject_id,
        subject_score
      ),
    ];
  }
}

interface ValidationError {
  field: string;
  message: string;
}
