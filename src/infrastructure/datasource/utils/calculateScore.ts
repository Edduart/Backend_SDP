import { prisma } from "../../../data/postgres";
import { EnrollmentTestResult } from "../../../domain/dtos/test/getTestBySubject.dto";

import { formatDate } from "../../../presentation/utils/formatDate";

// TODO clean code and add try and catch, if all is working as intended

export class calculateTestScore {
  public static async calculateTestScoreFromSubject(testScoreBySubject: any[]) {
    const decimalNumbers: number = 2; 
    console.log(testScoreBySubject.map((test) => test));
    if (testScoreBySubject.length == 0) {
      console.log("No score to calculate");
      return testScoreBySubject;
    } else {
      const testFilter: EnrollmentTestResult[] = testScoreBySubject.map(
        (subject) => {
          let totalSubjectScore: number = 0;
          let totalGradedScore: number = 0;
          let totalSubjectScoreOutOf10: number = 0; // final subject grade
          let totalGradedScoreOutOf10: number = 0;
          console.log({ totalSubjectScore });
          return {
            seminarian_id: subject.seminarian_id,
            seminarian_surname: subject.seminarian.user.person.surname,
            seminarian_forename: subject.seminarian.user.person.forename,
            subject_id: subject.subject_id,
            subject_name: subject.subject.description,
            subject_status: subject.status,
            enrollment_id: subject.enrollment_id,
            academic_term_id: subject.academic_term_id,
            start_date: formatDate(
              subject.academic_term.start_date.toISOString()
            ),
            end_date: formatDate(subject.academic_term.end_date.toISOString()),
            academic_term_status: subject.academic_term.status,
            test_score:
              subject.test_score.length === 0
                ? [{ error: "no test added by the teacher!" }]
                : subject.test_score.map((individualTest: any) => {
                    if (individualTest.score == 0) {
                      return {
                        message: "STILL NO GRADED BY THE TEACHER!",
                        test_description: individualTest.test.description,
                        test_score_out_of_20: "1 / 20",
                        test_score_out_max_test_score:
                          individualTest.test.maximum_score,
                      };
                    } else {
                      const { testScore, maxScore, totalTestScore } =
                        this.calculateIndividualScore(
                          individualTest.score,
                          individualTest.test.maximum_score
                        );
                      const formattedTestScore =
                        testScore.toFixed(decimalNumbers);
                      const formattedTotalTestScore =
                        totalTestScore.toFixed(decimalNumbers);
                      totalSubjectScore += +totalTestScore;
                      totalGradedScore += +maxScore;
                      console.log(testScore);
                      console.log(maxScore);
                      console.log([{ totalTestScore }]);
                      totalSubjectScoreOutOf10 = (totalSubjectScore / 100) * 10;
                      totalGradedScoreOutOf10 = (totalGradedScore / 100) * 10;
                      console.log("inside the second loop", {
                        totalSubjectScore,
                        totalSubjectScoreOutOf10,
                      });
                      return {
                        test_description: individualTest.test.description,
                        test_score_out_of_20: testScore < 1 ? "1.00" : formattedTestScore + " / 20",
                        test_score_out_max_test_score: totalTestScore < 1 ? "1.00" :
                          formattedTotalTestScore + " / " + maxScore,
                        test_score_was_edited:
                          individualTest.last_edited_date == null
                            ? "No"
                            : formatDate(
                                individualTest.last_edited_date.toISOString()
                              ),
                      };
                    }
                  }),
            subject_total_score_out_of_graded_score: totalSubjectScore < 1 ? "1.00" :
              totalSubjectScore.toFixed(decimalNumbers) +
              " / " +
              totalGradedScore,
            subject_total_score_out_of_graded_scored_10_scale: totalSubjectScoreOutOf10 < 1 ? "1.00" : 
              totalSubjectScoreOutOf10.toFixed(decimalNumbers) +
              " / " +
              totalGradedScoreOutOf10,
          };
        }
      );
      console.log(testFilter);
      console.log(testFilter.map((test) => test.test_score));
      return testFilter;
    }
  }
  public static async calculateFinalSubjectScore(testScoreBySubject: any[]) {
    let subjectScorePassMark: number = 6; // minimal required to approve
    if (testScoreBySubject.length > 0) {
      for (const subject of testScoreBySubject) {
        let totalSubjectScore: number = 0;
        let totalSubjectScoreOutOf10: number = 0; // final subject grade 10/10
        if (subject.test_score.length === 0) {
          console.log(
            "No test score: ",
            subject.seminarian_id,
            subject.subject_id
          );
        } else {
          for (const individualTest of subject.test_score) {
            const { totalTestScore } = await this.calculateIndividualScore(
              individualTest.score,
              individualTest.test.maximum_score
            );
            totalSubjectScore += totalTestScore;
            totalSubjectScoreOutOf10 = (totalSubjectScore / 100) * 10;
          }
        }
        if (totalSubjectScoreOutOf10 > subjectScorePassMark) {
          console.log(
            "APROBADO ,final subject score: ",
            { totalSubjectScoreOutOf10 },
            subject.seminarian_id,
            subject.test?.description
          );
          await prisma.enrollment.update({
            where: { enrollment_id: subject.enrollment_id },
            data: { status: "APROBADO" },
          });
        } else {
          console.log(
            "REPROBADO ,final subject score: ",
            { totalSubjectScoreOutOf10 },
            subject.seminarian_id,
            subject.test?.description
          );
          await prisma.enrollment.update({
            where: { enrollment_id: subject.enrollment_id },
            data: { status: "REPROBADO" },
          });
        }
      }
    }
    console.log("end of calculate score");
  }
  public static calculateIndividualScore(
    individualScore: number,
    maximumTestScore: number
  ) {
    const testScore: number = individualScore;
    const maxScore: number = maximumTestScore;
    const totalTestScore: number = (testScore / 20) * maxScore;
    return { testScore, maxScore, totalTestScore };
  }
}

// any needed interfaces
