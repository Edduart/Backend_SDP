import { prisma } from "../../../data/postgres";

// TODO clean code and add try and catch, if all is working as intended

export class GetStageOfSeminarianFilter {
  public static async filter(stage: string, seminarians: any[]) {
    if (stage == undefined) {
      console.log("stage go undefined");
      stage = "ALL";
    }

    const seminarianInfo = seminarians.map((item) => ({
      id: item.id,
      name: item.user.person.forename,
      surname: item.user.person.surname,
    }));

    const seminariansArray = seminarians.map((seminarians) => seminarians.id);

    console.log({ seminariansArray });

    const stages = {
      ALL: 0,
      PROPEDEUTICO: 1,
      DISCIPULAR: 2,
      CONFIGURATIVA: 3,
    };

    const stageNumber = stages[stage as keyof typeof stages];

    console.log({ stageNumber });

    let seminariansStage: SeminarianStage[] = [];

    for (let i = 0; i < seminariansArray.length; i++) {

       const seminarianInitialStage = await this.getStageByEnrollSubjectOnly(seminariansArray[i]);

      let seminarianStage: number = seminarianInitialStage; // initial stage
      const approvedSubjects = await prisma.enrollment.findMany({
        where: {
          seminarian_id: seminariansArray[i],
          status: "APROBADO",
        },
        include: { subject: true },
      });
      console.log("Seminarian actual: ", seminariansArray[i]);
      const approvedSubjectsArray = approvedSubjects.map(
        (subject) => subject.subject_id
      );
      for (let j = 0; j < 4; j++) {
        let stageNumber = 1;
        const subjects = await prisma.stage.findMany({
          where: { id: seminarianStage },
          include: {
            course: {
              select: {
                id: true,
                subject: {
                  where: { status: true },
                  select: { id: true, description: true },
                },
              },
            },
          },
        });
        let approveStage = true;
        console.log(subjects.length);
        subjects.map((stage) => {
          console.log({ stageNumber });
          for (let j = 0; j < stage.course.length; j++) {
            // courses
            console.log("J value", j);
            console.log("COURSE ID: ", stage.course[j].id);
            console.log("COURSE LENGTH: ");
            for (let k = 0; k < stage.course[j].subject.length; k++) {
              console.log("SUBJECT ID: ", stage.course[j].subject[k].id);
              if (
                !approvedSubjectsArray.includes(stage.course[j].subject[k].id)
              ) {
                console.log("no aprobo", stage.course[j].subject[k].id);
                approveStage = false;
              }
            }
          }
        });
        console.log({ approveStage });
        if (!approveStage) {
          console.log("se queda en el mismo stage");
          console.log(seminarianStage, seminariansArray[i]);
          break;
        } else {
          console.log("avanza al proximo stage");
          seminarianStage++;
          console.log(seminarianStage, seminariansArray[i]);
        }
        stageNumber++;
      }
      seminariansStage.push({
        id: seminariansArray[i],
        stage: seminarianStage,
      });
    }

    console.log({ seminarianInfo });

    console.log({ seminariansStage });

    if (stageNumber != 0) {
      const filterGivenStage = seminariansStage.filter(
        (stage) => stage.stage == stageNumber
      );

      console.log({ filterGivenStage });

      const stageMap = new Map(
        filterGivenStage.map((item) => [item.id, item.stage])
      );

      const result = seminarianInfo
        .filter((item) => stageMap.has(item.id))
        .map((item) => ({
          ...item,
          stage: stageMap.get(item.id),
        }));
      return result;
    }

    const stageMap = new Map(
      seminariansStage.map((item) => [item.id, item.stage])
    );

    const result = seminarianInfo
      .filter((item) => stageMap.has(item.id))
      .map((item) => ({
        ...item,
        stage: stageMap.get(item.id),
      }));

    return result;
  }

  public static async getStageByEnrollSubjectOnly(seminarian: string) {

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
