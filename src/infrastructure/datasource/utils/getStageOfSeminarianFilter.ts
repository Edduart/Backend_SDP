import { prisma } from "../../../data/postgres";

// TODO clean code and add try and catch, if all is working as intended

export class GetStageOfSeminarianMap {
  public static async mapResult(seminarians: any[]) {

    const seminariansInfo = seminarians.map((item) => ({
      id: item.id,
      name: item.user.person.forename,
      surname: item.user.person.surname,
      stage: item.stage
    }));
      return seminariansInfo;
    }
  


  public static async getStageByEnrollSubjectOnly(seminarian: string) { // TODO useless after make seminarian stage work

    console.log("check stage for enrollment active !")

    const seminarianPerStage = await prisma.seminarian.findUnique({
      where: { id: seminarian },
      select: {
        enrollment: {
          select: {
            subject: { select: { course: { select: { stage_id: true } } } },
          },
        },
      },
    });

    const seminarianPerStageArray = [... new Set(seminarianPerStage?.enrollment.flatMap( enrollment => enrollment.subject.course.stage_id))];

    const SeminarianInitialStage = seminarianPerStageArray.length;

    console.log("result for: ", seminarian);
    console.log(seminarianPerStageArray);
    console.log(SeminarianInitialStage);

    return SeminarianInitialStage === 0 ? 1 : SeminarianInitialStage;
  }
}

interface SeminarianStage {
  id: string;
  stage: number;
}
[];
