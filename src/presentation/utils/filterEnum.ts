export class FilterEnum {
  public static filterInstructorPosition(instructorPositions: any[]) {
    let instructorPositionEnum: InstructorPositionResponse = {
      RECTOR: "RECTOR",
      VICERECTOR: "VICERECTOR",
      ASESOR_PROPEDEUTICO: "ASESOR PROPEDEUTICO",
      DIRECTOR_ESPIRITUAL: "DIRECTOR ESPIRITUAL",
      ECONOMO: "ECONOMO",
    };
    for (const instructorPosition of instructorPositions) {
      if (instructorPosition.instructor_position == "RECTOR") {
        delete instructorPositionEnum.RECTOR;
      }
      if (instructorPosition.instructor_position == "VICERECTOR") {
        delete instructorPositionEnum.VICERECTOR;
      }
      if (instructorPosition.instructor_position == "ASESOR_PROPEDEUTICO") {
        delete instructorPositionEnum.ASESOR_PROPEDEUTICO;
      }
      if (instructorPosition.instructor_position == "DIRECTOR_ESPIRITUAL") {
        delete instructorPositionEnum.DIRECTOR_ESPIRITUAL;
      }
      if (instructorPosition.instructor_position == "ECONOMO") {
        delete instructorPositionEnum.ECONOMO;
      }
    }
    return instructorPositionEnum;
  }
}
interface InstructorPositionResponse {
  RECTOR?: "RECTOR";
  VICERECTOR?: "VICERECTOR";
  ASESOR_PROPEDEUTICO?: "ASESOR PROPEDEUTICO";
  DIRECTOR_ESPIRITUAL?: "DIRECTOR ESPIRITUAL";
  ECONOMO?: "ECONOMO";
}
