import { prisma } from "../../../data/postgres";
import { EnrollmentTestResult } from "../../../domain/dtos/test/getTestBySubject.dto";
import { formatDate } from "../../../presentation/utils/formatDate";

// TODO clean code and add try and catch, if all is working as intended
// TODO redondeo si la nota es mas de .50

export class calculateTestScore {
  public static async calculateTestScoreFromSubject(
    testScoreBySubject: any[]
  ) {
    const decimalNumbers: number = 2;
    console.log(testScoreBySubject.map((test) => test));
    if (testScoreBySubject.length == 0) {
      return testScoreBySubject;
    } else {

      const calculateScore: EnrollmentTestResult[] = testScoreBySubject.map(
        (seminarian) => {

          let seminarianGradeAverageCounter: number = 0;
          let numberOfEnrollments: number = 0;

          return {
            seminarian_id: seminarian.id,
            seminarian_surname: seminarian.user.person.surname,
            seminarian_forename: seminarian.user.person.forename,
            enrollment: seminarian.enrollment.map((subject: any) => {
              numberOfEnrollments++;

              let totalSubjectScore: number = 0;
              let totalGradedScore: number = 0;
              let totalSubjectScoreOutOf10: number = 0; // final subject grade
              let totalGradedScoreOutOf10: number = 0;

              console.log(subject.subject_id);
              console.log("count of max score ", totalSubjectScoreOutOf10);

              return {
                subject_id: subject.subject_id,
                subject_name: subject.subject.description,
                subject_status: subject.status,
                enrollment_id: subject.enrollment_id,
                academic_term_id: subject.academic_term.id,
                start_date: formatDate(
                  subject.academic_term.start_date!.toISOString()
                ),
                end_date: formatDate(
                  subject.academic_term.end_date!.toISOString()
                ),
                academic_term_status: subject.academic_term.status,
                test_score:
                  subject.test_score?.length === 0
                    ? [{ error: "no test added by the teacher!" }]
                    : subject.test_score?.map((individualTest: any) => {
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
                          seminarianGradeAverageCounter -=
                            totalSubjectScoreOutOf10;
                          totalSubjectScoreOutOf10 =
                            (totalSubjectScore / 100) * 10;
                          totalGradedScoreOutOf10 =
                            (totalGradedScore / 100) * 10;

                          console.log("inside the second loop", {
                            totalSubjectScore,
                            totalSubjectScoreOutOf10,
                          });

                          seminarianGradeAverageCounter +=
                            totalSubjectScoreOutOf10;

                          return {
                            test_description: individualTest.test.description,
                            test_score_out_of_20:
                              testScore < 1
                                ? "1.00"
                                : formattedTestScore + " / 20",
                            test_score_out_max_test_score:
                              totalTestScore < 1
                                ? "1.00"
                                : formattedTotalTestScore + " / " + maxScore,
                            test_score_was_edited:
                              individualTest.last_edited_date == null
                                ? "No"
                                : formatDate(
                                    individualTest.last_edited_date.toISOString()
                                  ),
                          };
                        }
                      }),
                subject_total_score_out_of_graded_score:
                  totalSubjectScore < 1
                    ? "1.00"
                    : totalSubjectScore.toFixed(decimalNumbers) +
                      " / " +
                      totalGradedScore,
                subject_total_score_out_of_graded_scored_10_scale:
                  totalSubjectScoreOutOf10 < 1
                    ? "1.00"
                    : totalSubjectScoreOutOf10.toFixed(decimalNumbers) +
                      " / " +
                      totalGradedScoreOutOf10,
              };
            }),
            grade_point_average: (
              seminarianGradeAverageCounter / numberOfEnrollments
            ) < 1 ? "1.00" : (seminarianGradeAverageCounter / numberOfEnrollments).toFixed(
              decimalNumbers
            ),
          };
        }
      );
      return calculateScore;
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

    return { status: "Ok" };
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
