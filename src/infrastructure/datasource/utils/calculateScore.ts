import { prisma } from "../../../data/postgres";

// TODO clean code and add try and catch, if all is working as intended

export class calculateTestScore {
  public static async calculateTestScoreFromSubject(testScoreBySubject: any[]) {
    const decimalNumbers: number = 2;

    if (testScoreBySubject.length == 0) {
      console.log("No score to calculate");
      return testScoreBySubject;
    } else {
      const testFilter = testScoreBySubject.map((subject) => {
        let totalSubjectScore: number = 0; //15
        let totalGradedScore: number = 0;
        let totalSubjectScoreOutOf20: number = 0;
        let totalGradedScoreOutOf20: number = 0;

        console.log({ totalSubjectScore });

        return {
          seminarian_id: subject.seminarian_id,
          seminarian_surname: subject.seminarian.user.person.surname,
          seminarian_forename: subject.seminarian.user.person.forename,
          subject_name: subject.subject.description,
          subject_id: subject.subject_id,
          enrollment_id: subject.enrollment_id,
          academic_term_id: subject.academic_term_id,
          status: subject.status,
          test_score:
            subject.test_score.length === 0
              ? [{ error: "no test added by the teacher!" }]
              : subject.test_score.map((individualTest: any) => {
                  if (individualTest.score == 0) {
                    return {
                      message: "STILL NO GRADED BY THE TEACHER!",
                      test_description: individualTest.test.description,
                      test_score_out_of_100: "0 / 100",
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

                    totalSubjectScoreOutOf20 = (totalSubjectScore / 100) * 20;
                    totalGradedScoreOutOf20 = (totalGradedScore / 100) * 20;

                    console.log("inside the second loop", {
                      totalSubjectScore,
                      totalSubjectScoreOutOf20,
                    });

                    return {
                      test_description: individualTest.test.description,
                      test_score_out_of_100: formattedTestScore + " / 100",
                      test_score_out_max_test_score:
                        formattedTotalTestScore + " / " + maxScore,
                    };
                  }
                }),
          subject_total_score_out_of_graded_score:
            totalSubjectScore.toFixed(decimalNumbers) +
            " / " +
            totalGradedScore,
          subject_total_score_out_of_graded_scored:
            totalSubjectScoreOutOf20.toFixed(decimalNumbers) +
            " / " +
            totalGradedScoreOutOf20,
        };
      });

      console.log(testFilter);

      console.log(testFilter.map((test) => test.test_score));

      return testFilter;
    }
  }

  public static calculateIndividualScore(
    individualScore: number,
    maximumTestScore: number
  ) {
    const testScore: number = individualScore;
    const maxScore: number = maximumTestScore;
    const totalTestScore: number = (testScore / 100) * maxScore;

    return { testScore, maxScore, totalTestScore };
  }
}
// any needed interfaces

interface Enrollment {
  enrollment_id: number;
  seminarian_id: string;
  subject_id: number;
  academic_term_id: number;
  status: string;
  test_score: {
    test_id?: number;
    score?: number;
    status?: number;
    test?: {
      id: number;
      description: string;
      status: boolean;
      maximum_score: number;
    };
  }[];
}
[];
