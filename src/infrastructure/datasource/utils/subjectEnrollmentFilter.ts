import { prisma } from "../../../data/postgres";
import { SeminarianStatus } from "../enrollment.dataSource.impl";


// TODO if all its okay after all test then clean code and comments, add try and catch too 
export class EnrollmentSubjectFilter {
  static async subjectFilter(
    enrollmentStatus: SeminarianStatus[],
    id: string
  ): Promise<object> {
    console.log("running filter");
    //console.log({ enrollmentStatus });

    let seminarianStage: number = 1;
    let seminarianCourse: number[] = [1];

    console.log(seminarianCourse.length);

    const approbatedSubjects = enrollmentStatus.filter((subject) => {
      return subject.status === "APROBADO";
    });

    const approbatedSubjectsArray = approbatedSubjects.map(
      (subjectsId) => subjectsId.subject_id
    );

    for (let i = 1; i < 4; i++) {

      const subjects = await prisma.stage.findMany({
        where: { id: seminarianStage },
        select: {
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

      //console.log({ approbatedSubjects });
      //console.log(JSON.stringify(subjects));

      let approveStage = true;
      //let coursePassed = false;

      subjects.map((stage) => {
        for (let j = 0; j < stage.course.length; j++) {

          let approveAtLeastOne = false; // in the given course

          console.log("J value", j);
          console.log("COURSE ID: ", stage.course[j].id);
          console.log("COURSE LENGTH: ");

          for (let k = 0; k < stage.course[j].subject.length; k++) {
            console.log("SUBJECT ID: ", stage.course[j].subject[k].id);

            if (
              !approbatedSubjectsArray.includes(stage.course[j].subject[k].id)
            ) {
              console.log("no aprobo", stage.course[j].subject[k].id);
              approveStage = false;
            } else {
              approveAtLeastOne = true;
            }
          }
          if (approveAtLeastOne == false) {
            break;
          }else{
            seminarianCourse.push(seminarianCourse.length + 1)
            console.log("aprovo una matera del curso actual, pasa al siguiente: ",seminarianCourse);
          }
        }
      });

      /*stage.course.map((course) => {
          
          course.subject.forEach((subject) => {

            if (!approbatedSubjectsArray.includes(subject.id)) {
              console.log("no aprobo", subject.id);
              approveStage = false;
            } else {
              coursePassed = true;
              console.log("uno aprobado", subject.id);
            }
          });
        return course.id;  
        })
      );*/
      //console.log(JSON.stringify(testCourseFilter));

      /*if (coursePassed) {
        console.log("avanza 1 curso");
        seminarianCourse.push(seminarianCourse.length + 1);
        console.log(seminarianCourse);
      }*/
      console.log({ approveStage });
      if (!approveStage) {
        console.log("se queda en el mismo stage");
        break;
      } else {
        console.log("avanza al proximo stage");
        seminarianStage++;
        console.log(seminarianStage);
      }
    }

    const availableStagesAndCourses = await prisma.stage.findMany({
      where: { id: seminarianStage },
      include: { course: { where: { id: { in: seminarianCourse } } } },
    }); // here need to remove stages

    if (enrollmentStatus.length == 0) {
      console.log("No enrollments, so course = 0");
      const SubjectsResult = await prisma.stage.findMany({
        where: { id: availableStagesAndCourses[0].id },
        include: {
          course: {
            where: { id: availableStagesAndCourses[0].id },
            include: {
              subject: {
                where: {
                  semester: 1,
                  status: { not: false },
                  precedent: { equals: null },
                },
                include: { academic_field: true },
              },
            },
          },
        },
      });
      const availableSubjects: SubjectAllowToEnrollCourseZero = {
        seminarian_id: id,
        stage: SubjectsResult[0].description,
        course: SubjectsResult[0].course.map((course) => ({
          course: course.description,
          subject: course.subject.map((subject) => ({
            id: subject.id,
            name: subject.description,
            semester: subject.semester,
          })), // Empty array to match the interface
        })),
      };
      //console.log( availableSubjects.course[0] );
      return availableSubjects;
    } else {
      //console.log({ availableStagesAndCourses });
      //console.log({ enrollmentStatus });
      console.log("No enrollments, so course > 0");

      availableStagesAndCourses.map((test) => {
        test.course.map((course) => {
          course.id;
        });
      });

      const subjectResult = await prisma.stage.findMany({
        where: {
          id: {
            in: availableStagesAndCourses.map((stage) => stage.id),
          },
        },
        include: {
          course: {
            where: {
              id: {
                in: availableStagesAndCourses.flatMap((stage) =>
                  stage.course.map((course) => course.id)
                ),
              },
            },
            include: {
              subject: {
                where: { status: { not: false } },
                include: { academic_field: true },
              },
            },
          },
        },
      });

      // to filter

      //console.log(enrollmentStatus);

      const subjectsToFilter = enrollmentStatus.map((item) => item.subject_id);

      const precedentFilter = enrollmentStatus.map((item) => ({
        id: item.subject_id,
        status: item.status,
      }));

      console.log({ subjectsToFilter });

      // here I can start to filter
      let approvedPrecedent: number[] = [];

      const subjectResultWithPrecedent = subjectResult.map((stage) => ({
        id: stage.id,
        description: stage.description,
        course: stage.course.map((course) => ({
          id: course.id,
          stage_id: course.stage_id,
          description: course.description,
          instructor_id: course.instructor_id,
          subject: course.subject.filter(
            (subject) => {
              console.log("actual subject ID: ", subject.id);
              const isIncluded = subjectsToFilter.includes(subject.id);
              if (subject.precedent) {
                const precedentIsIncluded = subjectsToFilter.includes(
                  subject.precedent
                );
                if (precedentIsIncluded) {
                  console.log(
                    "TIENE PRECEDENTE Y ESTA EN LA LISTA",
                    {
                      isIncluded,
                    },
                    subject.precedent
                  );
                  let filter: boolean = false;
                  precedentFilter.forEach((item) => {
                    //  true where ( item.id and item.status === "aprobado")

                    console.log("id actual", item.id);

                    const approbate = item.id && item.status === "APROBADO";
                    console.log(item.id);
                    console.log({ approbate });
                    if (item.id === subject.precedent && approbate) {
                      approvedPrecedent.push(subject.id);

                      console.log("MATERIA APROBADA ");

                      filter = true;
                    } else {
                      console.log("MATERIA NO APROBADA ");
                    }
                  });
                  console.log({ filter });
                  return filter;
                } else {
                  console.log("tiene precedente pero no esta en la lista");
                  return false; // means no exist
                }
              } else {
                return !isIncluded;
              }
            }
            //return true will include
          ),
        })),
      }));

      console.log({ approvedPrecedent });

      const isPrecedentEnroll = await prisma.enrollment.findMany({
        where: {
          seminarian_id: id,
          subject_id: { in: approvedPrecedent },
          OR: [{ status: "CURSANDO" }, { status: "APROBADO" }],
        },
      });

      const isPrecedentEnrollArray = isPrecedentEnroll.map(
        (subject) => subject.subject_id
      );

      console.log({ isPrecedentEnrollArray });

      const filteredSubjectResult = subjectResultWithPrecedent.map((stage) => ({
        id: stage.id,
        description: stage.description,
        course: stage.course.map((course) => ({
          id: course.id,
          stage_id: course.stage_id,
          description: course.description,
          instructor_id: course.instructor_id,
          subject: course.subject.filter(
            (subject) => {
              if (isPrecedentEnrollArray.includes(subject.id)) {
                console.log("remove", subject.id);
                return false;
              } else {
                console.log("stay", subject.id);
                return true;
              }
            }
            //return true will include
          ),
        })),
      }));

      /*const filterPrecedentTest = filteredSubjectResult.map((stage) =>
        stage.course.map((course) => course.subject.map((subject) => subject))
      );*/

      console.log(JSON.stringify(filteredSubjectResult));

      const availableSubjects: SubjectAllowToEnroll = {
        seminarian_id: id,
        stage: filteredSubjectResult.map((stage) => ({
          stage: stage.description,
          course: stage.course.map((course) => ({
            course: course.description,
            subject: course.subject.map((subject) => ({
              id: subject.id,
              name: subject.description,
              semester: subject.semester,
            })), // Empty array to match the interface
          })),
        })),
      };

      return availableSubjects;
    }
  }
}

interface SubjectAllowToEnroll {
  seminarian_id: string;
  stage: {
    stage: string;
    course: {
      course: string;
      subject: {
        id: number;
        name: string;
        semester: number;
      }[];
    }[];
  }[];
}
// old
interface SubjectAllowToEnrollCourseZero {
  seminarian_id: string;
  stage: string;
  course: {
    course: string;
    subject: {
      id: number;
      name: string;
      semester: number;
    }[];
  }[];
}

/*
interface SubjectAllowToEnroll1 {
  seminarian_id: string;
  stage: string;
  course: {
    description: string;
    subject: Array<object>;
  }[];
}
*/

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

/*


      subjects.map((stage) =>
        stage.course.map((course) => {
      
          

          course.subject.forEach((subject) => {
            console.log(course.id);
            if (!approbatedSubjectsArray.includes(subject.id)) {
              console.log("no aprobo", subject.id);
              approveStage = false;
            } else {
              coursePassed = true;
              console.log("uno aprobado", subject.id);
            }
          });
        })
      );
      

      */
