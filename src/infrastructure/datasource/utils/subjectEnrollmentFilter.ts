import { prisma } from "../../../data/postgres";
import { SeminarianStatus } from "../enrollment.dataSource.impl";
import { SubjectAllowToEnroll, SubjectAllowToEnrollEquivalency } from "../../../domain";

// TODO if all its okay after all test then clean code and comments, add try and catch too

export class EnrollmentSubjectFilter {
  static async subjectFilter(
    enrollmentStatus: SeminarianStatus[],
    id: string
  ): Promise<object> {
    const getSeminarianStage = await prisma.seminarian.findUnique({
      where: { id: id },
      select: { stage: true },
    });

    const enrolledSubjectsCompleteList = enrollmentStatus.map(
      (enrolledSubjects) => ({
        id: enrolledSubjects.subject_id,
        status: enrolledSubjects.status,
        precedent: enrolledSubjects.subject.precedent,
        course: enrolledSubjects.subject.course_id,
      })
    );

    console.log({ enrolledSubjectsCompleteList });

    let seminarianStage: number = getSeminarianStage!.stage!;

    const availableSubjects = await prisma.stage.findMany({
      where: { id: seminarianStage },
      select: {
        description: true,
        course: {
          select: {
            id: true,
            description: true,
            subject: {
              where: { status: true },
              select: {
                id: true,
                description: true,
                precedent: true,
                course: { select: { id: true } },
                semester: true,
              },
            },
          },
        },
      },
    });

    let numberOfIterations: number = 0;
    let approvedAtLeastOne = false;

    const filterSubjects = availableSubjects.map((stage) => ({
      description: stage.description,
      course: stage.course.map((course) => {
        numberOfIterations++;
        if (numberOfIterations === 1 || approvedAtLeastOne) {
          approvedAtLeastOne = false;
          return {
            description: course.description,
            subject: course.subject.filter((subject) => {
              console.log("actual subject", subject.id);

              const subjectEnrolledApproved =
                enrolledSubjectsCompleteList.filter(
                  (subjectEnrolled) =>
                    subjectEnrolled.id === subject.id &&
                    subjectEnrolled.status === "APROBADO"
                );

              console.log({ subjectEnrolledApproved }); // subjectEnrolledApproved: [ { id: 1, status: 'APROBADO', precedent: null, course: 1 } ]

              if (subjectEnrolledApproved.length > 0) approvedAtLeastOne = true; // so can advance a course

              const subjectEnrolledOther = enrolledSubjectsCompleteList.filter(
                (subjectEnrolled) =>
                  subjectEnrolled.id === subject.id &&
                  subjectEnrolled.status !== "APROBADO"
              );

              console.log({ subjectEnrolledOther }); //subjectEnrolledApproved: [ { id: 1, status: 'OTHERS', precedent: null, course: 1 } ]

              if (subject.precedent != null) {
                console.log(
                  subject.id,
                  "have a precedent: ",
                  subject.precedent
                );

                const matchingPrecedent = enrolledSubjectsCompleteList.filter(
                  (SubjectPrecedentApproved) => {
                    if (
                      SubjectPrecedentApproved.id === subject.precedent &&
                      SubjectPrecedentApproved.status === "APROBADO"
                    ) {
                      console.log("precedent was approved");
                      return true;
                    }
                  }
                );
                if (matchingPrecedent.length > 0) {
                  if (
                    matchingPrecedent
                      .map((precedent) => precedent.id)
                      .includes(subject.precedent)
                  ) {
                    if (
                      subjectEnrolledApproved.length > 0 ||
                      subjectEnrolledOther.length > 0
                    ) {
                      console.log("already enrolled so is removed", subject.id);
                      return false;
                    } else {
                      console.log(
                        "No removed because precedent approved",
                        subject.id
                      );
                      return true;
                    }
                  } else {
                    console.log(
                      "Removed because precedent no approved",
                      subject.id
                    );
                    return false;
                  }
                } else if (subjectEnrolledOther.length > 0) {
                  console.log(
                    "Removed because precedent no approved",
                    subject.id
                  );
                  return false;
                }
              } else {
                if (subjectEnrolledApproved.length > 0) {
                  console.log("Removed because approved", subject.id);
                  approvedAtLeastOne = true;
                  return false;
                } else if (subjectEnrolledOther.length > 0) {
                  console.log("Removed because is enrolled", subject.id);
                  return false;
                } else {
                  console.log("No removed, no enrolled", subject.id);
                  return true;
                }
              }
            }),
          };
        } else {
          return undefined;
        }
      }),
    }));

    console.log(JSON.stringify(filterSubjects));

    const availableSubjectsMap: SubjectAllowToEnroll = {
      seminarian_id: id,
      stage: filterSubjects.map((stage) => stage.description).toString(),
      course: filterSubjects.flatMap((stage) =>
        stage.course.map((course) => ({
          course: course?.description,
          subject: course?.subject?.map((subject) => ({
            id: subject.id,
            name: subject.description,
            semester: subject.semester,
          })),
        }))
      ),
    };
    return availableSubjectsMap;
  }

  

  static async subjectFilterForEquivalency(
    enrollmentStatus: any[],
    id: string
  ): Promise<SubjectAllowToEnrollEquivalency> {

    try{

    const enrolledSubjectsCompleteList = enrollmentStatus.map(
      (enrolledSubjects) => ({
        id: enrolledSubjects.subject_id,
        status: enrolledSubjects.status,
        precedent: enrolledSubjects.subject.precedent,
        course: enrolledSubjects.subject.course_id,
      })
    );

    console.log({ enrolledSubjectsCompleteList });

    const availableSubjects = await prisma.stage.findMany({
      select: {
        description: true,
        course: {
          select: {
            id: true,
            description: true,
            subject: {
              where: { status: true },
              select: {
                id: true,
                description: true,
                precedent: true,
                course: { select: { id: true } },
                semester: true,
              },
            },
          },
        },
      },
    });

    const filterSubjects = availableSubjects.map((stage) => ({
      description: stage.description,
      course: stage.course.map((course) => {
        if (true) {
          return {
            description: course.description,
            subject: course.subject.filter((subject) => {
              console.log("actual subject", subject.id);

              const subjectEnrolledApproved =
                enrolledSubjectsCompleteList.filter(
                  (subjectEnrolled) =>
                    subjectEnrolled.id === subject.id &&
                    subjectEnrolled.status === "APROBADO"
                );

              console.log({ subjectEnrolledApproved }); // subjectEnrolledApproved: [ { id: 1, status: 'APROBADO', precedent: null, course: 1 } ]

              const subjectEnrolledOther = enrolledSubjectsCompleteList.filter(
                (subjectEnrolled) =>
                  subjectEnrolled.id === subject.id &&
                  subjectEnrolled.status !== "APROBADO"
              );

              console.log({ subjectEnrolledOther }); //subjectEnrolledApproved: [ { id: 1, status: 'OTHERS', precedent: null, course: 1 } ]

              if (subject.precedent != null) {
                console.log(
                  subject.id,
                  "have a precedent: ",
                  subject.precedent
                );

                const matchingPrecedent = enrolledSubjectsCompleteList.filter(
                  (SubjectPrecedentApproved) => {
                    if (
                      SubjectPrecedentApproved.id === subject.precedent &&
                      SubjectPrecedentApproved.status === "APROBADO"
                    ) {
                      console.log("precedent was approved");
                      return true;
                    }
                  }
                );
                if (matchingPrecedent.length > 0) {
                  if (
                    matchingPrecedent
                      .map((precedent) => precedent.id)
                      .includes(subject.precedent)
                  ) {
                    if (
                      subjectEnrolledApproved.length > 0 ||
                      subjectEnrolledOther.length > 0
                    ) {
                      console.log("already enrolled so is removed", subject.id);
                      return false;
                    } else {
                      console.log(
                        "No removed because precedent approved",
                        subject.id
                      );
                      return true;
                    }
                  } else {
                    console.log(
                      "Removed because precedent no approved",
                      subject.id
                    );
                    return false;
                  }
                } else if (subjectEnrolledOther.length > 0) {
                  console.log(
                    "Removed because precedent no approved",
                    subject.id
                  );
                  return false;
                }
              } else {
                if (subjectEnrolledApproved.length > 0) {
                  console.log("Removed because approved", subject.id);
                  return false;
                } else if (subjectEnrolledOther.length > 0) {
                  console.log("Removed because is enrolled", subject.id);
                  return false;
                } else {
                  console.log("No removed, no enrolled", subject.id);
                  return true;
                }
              }
            }),
          };
        }
      }),
    }));

    console.log(JSON.stringify(filterSubjects));

    const availableSubjectsEquivalencyMap: SubjectAllowToEnrollEquivalency = {
      seminarian_id: id,
      stage: filterSubjects.flatMap((stage) => ({
        name: stage.description,
        stage: stage.course.map((course) => ({
          course: course?.description,
          subject: course?.subject?.map((subject) => ({
            id: subject.id,
            name: subject.description,
            semester: subject.semester,
          })),
        })),
      })),
    };
    return availableSubjectsEquivalencyMap;
  } catch(error) {
    console.log(error);
    throw error
  }
  }
}
export interface EnrollmentGetInterface {
  seminarian_id: string;
  subject: {
    id: number;
    name: string;
  };
  academic_term: {
    id: number;
    start_date: string | null;
    end_date: string | null;
    status: string;
  };
  subject_status: string;
}
