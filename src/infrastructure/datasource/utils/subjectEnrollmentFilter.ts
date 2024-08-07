import { prisma } from "../../../data/postgres";
import { stages } from "../../../seed/data";
import { subject } from "../../../seed/data/subject";

import { SeminarianStatus } from "../enrollment.dataSource.impl";

export class EnrollmentSubjectFilter {
  static async subjectFilter(
    enrollmentStatus: SeminarianStatus[],
    id: string
  ): Promise<object> {
    console.log("running filter");

    const availableStagesAndCourses = await prisma.stage.findMany({
      include: { course: true },
    });

    if (enrollmentStatus.length == 0) {
      console.log("No enrollments, so course = 0");
      const SubjectsResult = await prisma.stage.findMany({
        where: { id: availableStagesAndCourses[0].id },
        include: {
          course: {
            where: { id: availableStagesAndCourses[0].id },
            include: {
              subject: {
                where: { semester: 1, status: { not: false } },
                include: { academic_field: true },
              },
            },
          },
        },
      });
      const availableSubjects: SubjectAllowToEnroll = {
        seminarian_id: id,
        stage: SubjectsResult[0].description,
        course: SubjectsResult[0].course.map((course) => ({
          description: course.description,
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

      console.log(enrollmentStatus);

      const subjectsToFilter = enrollmentStatus.map((item) => item.subject_id);

      console.log({ subjectsToFilter });

      // no filtered

      const test = subjectResult.flatMap((item) => item);

      //console.log(test);

      // here I can start to filter

      const test2 = subjectResult.map((item) => {
        const courses = item.course.map((course) => {
          let subjectFilter = course.subject.map((subject) => {
            console.log("iteration", subject.id)
            if (!subjectsToFilter.some(id => id === subject.id)) {
              console.log("filtered: ", subject.id);
              return subject;
            } else {
              console.log("added: ", subject.id);
            }
          });
          return {
            id: course.id,
            stage_id: course.stage_id,
            description: course.description,
            instructor_id: course.instructor_id,
            subject: subjectFilter,
          };
        });

        return {
          id: item.id,
          description: item.description,
          course: courses,
        };
      });

      console.log(JSON.stringify(test2));

      /*const filteredResult = subjectResult.flatMap((stages) =>
        stages.course.flatMap((courses) =>
          courses.subject.map((subjects) => subjects.id)
        )
      );*/

      // start to remove

      //console.log({ filteredResult });

      //console.log(JSON.stringify(subjectResult));

      return test2;
    }
  }
}

interface SubjectAllowToEnroll {
  seminarian_id: string;
  stage: string;
  course: {
    description: string;
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
