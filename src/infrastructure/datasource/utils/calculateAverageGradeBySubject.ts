import { prisma } from "../../../data/postgres";

import {calculateTestScore} from "./calculateScore"

export class calculateAverageGrade {
  public static async getAverageGradeBySubject(enrollments: any[]) {

    let averageGradeInTheSubject: number = 0;
    let numberOfEnrollments: number = enrollments.length;

    for (const enrollment of enrollments) {
      let individualEnrollmentFinalGrade: number = 0;
      for (const testScore of enrollment.test_score) {

        const { totalTestScore } = calculateTestScore.calculateIndividualScore(
          +testScore.test.maximum_score,
          +testScore.score
        );

        individualEnrollmentFinalGrade += +totalTestScore.toFixed(2);
      }

      console.log({ individualEnrollmentFinalGrade });

      averageGradeInTheSubject += individualEnrollmentFinalGrade;
    }

    averageGradeInTheSubject = averageGradeInTheSubject / numberOfEnrollments;
    
    const subjectAverageGrade: any = {
      subject: enrollments[0].subject.description,
      number_of_seminarians: numberOfEnrollments,
      average_grade: averageGradeInTheSubject,
    };

    console.log({ subjectAverageGrade });

    return subjectAverageGrade;

  }
}
