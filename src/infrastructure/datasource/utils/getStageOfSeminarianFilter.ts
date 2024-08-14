import { prisma } from "../../../data/postgres";

// TODO clean code and add try and catch, if all is working as intended

export class GetStageOfSeminarianFilter {
  public static async filter(stage: string, seminarians: any[]) {
    
    const seminarianInfo = seminarians.map((item) => ({
      id: item.id,
      name: item.user.person.forename,
      surname: item.user.person.surname,
    }));

    const seminariansArray = seminarians.map((seminarians) => seminarians.id);

    console.log({ seminariansArray });

    const stages = {
      PROPEDEUTICO: 1,
      DISCIPULAR: 2,
      CONFIGURATIVA: 3,
    };

    const stageNumber = stages[stage as keyof typeof stages];

    console.log({ stageNumber });

    let seminariansStage: SeminarianStage[] = [];

    for (let i = 0; i < seminariansArray.length; i++) {
      let seminarianStage: number = 1;
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

    const filterGivenStage = seminariansStage.filter(
      (stage) => stage.stage == stageNumber
    );

    console.log({ filterGivenStage });

    const stageMap = new Map(
      filterGivenStage.map((item) => [item.id, item.stage])
    );

    const result = seminarianInfo.filter((item) => stageMap.has(item.id)).map((item) => ({
        ...item,
        stage: stageMap.get(item.id),
      }));

      console.log({ result });

    return result;
  }
}

interface SeminarianStage {
  id: string;
  stage: number;
}
[];
