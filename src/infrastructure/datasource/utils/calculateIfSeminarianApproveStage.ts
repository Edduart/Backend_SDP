import { prisma } from "../../../data/postgres";

export class calculateStageStatus {
  public static async calculateIfSeminarianApproveStage(
    seminarians: AllEnrollmentBySeminarian[]
  ) {
    for (const seminarian of seminarians) {
      const subjectsByStage = await prisma.subject.findMany({
        where: {
          AND: [{ course: { stage_id: seminarian.stage } }, { status: true }],
        },
        select: { id: true },
      });

      const seminarianApprovedSubjects = seminarian.enrollment.map(
        (subject) => subject.subject_id
      );

      const noApprovedSubjects = subjectsByStage
        .filter((subjects) => !seminarianApprovedSubjects.includes(subjects.id))
        .map((subjectsToArray) => subjectsToArray.id);

      console.log({ noApprovedSubjects });

      if (noApprovedSubjects.length === 0 && seminarian.stage < 3) {
        console.log("seminarian approved: ", seminarian.id)
        await prisma.seminarian.update({
          where: { id: seminarian.id },
          data: { stage: seminarian.stage + 1 },
        });
      } else if (noApprovedSubjects.length === 0 && seminarian.stage === 3) {
        console.log("seminarian approved and culminated: ", seminarian.id);
        await prisma.seminarian.update({
          where: { id: seminarian.id },
          data: { stage: seminarian.stage + 1, status: "CULMINADO" },
        });
      } else {
        console.log("seminarian NO approved: ", seminarian.id);
      }
    }
    return {status: "Ok"};
  }
}

export interface AllEnrollmentBySeminarian {
  id: string;
  stage: number;
  enrollment: {
    enrollment_id: number;
    seminarian_id: string;
    subject_id: number;
    academic_term_id: number;
    status: string;
  }[];
}
[];
