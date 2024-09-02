
import { prisma } from "../../../data/postgres";

export class calculateAverageGrade {

  public static async getAverageGradeBySubject (enrollments: any[]) {

        const enrollments1 = await prisma.enrollment.findMany({
          where: {
            academic_term_id: 1,
            subject_id: 1,
          },
          include: {
            subject: { select: { description: true } },
            test_score: { select: { score: true } },
          },
        });


    for (const enrollment of enrollments1) {

        let individualEnrollmentFinalGrade: number = 0;
        let numberOfExams: number = enrollment.test_score.length;

        for(const testScore of enrollment.test_score){
            individualEnrollmentFinalGrade =+ +testScore.score.toFixed(2)
        }

        

    }

  }
}