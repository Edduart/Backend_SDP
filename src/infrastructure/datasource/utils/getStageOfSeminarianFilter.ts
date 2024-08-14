import { prisma } from "../../../data/postgres";

// TODO clean code and add try and catch, if all is working as intended

export class GetStageOfSeminarianFilter {
  public static async filter(stage: string, seminarians: string[]) {

    const stages = {
      "PROPEDEUTICO": 1,
      "DISCIPULAR": 2,
      "CONFIGURATIVA": 3
    }

    const stageNumber = stages[stage as keyof typeof stages];

    console.log({ stageNumber });


    let seminariansStage: SeminarianStage[] = [];

    for (let i = 0; i < seminarians.length; i++) {
      let seminarianStage: number = 1;
      const approvedSubjects = await prisma.enrollment.findMany({
        where: {
          seminarian_id: seminarians[i],
          status: "APROBADO",
        },
        include: { subject: true },
      });
      console.log("Seminarian actual: ", seminarians[i]);
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
          console.log(seminarianStage, seminarians[i]);
          break;
        } else {
          console.log("avanza al proximo stage");
          seminarianStage++;
          console.log(seminarianStage, seminarians[i]);
        }
        stageNumber++;
      }
      seminariansStage.push({ id: seminarians[i], stage: seminarianStage });
    }

    console.log({ seminariansStage });

    const filterGivenStage = seminariansStage.filter(stage => stage.stage == stageNumber)

    console.log({ filterGivenStage });

    return filterGivenStage;
  }
}

interface SeminarianStage {
  id: string;
  stage: number
}[]