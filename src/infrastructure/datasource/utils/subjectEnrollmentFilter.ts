import { prisma } from "../../../data/postgres";
import { subject } from "../../../seed/data/subject";

export class EnrollmentSubjectFilter {
  static async subjectFilter(EnrollmentStatus: object[], id: string): Promise<object> {
    
    console.log({ EnrollmentStatus });
    console.log("running filter");

    const availableStagesAndCourses = await prisma.stage.findMany({
      include: { course: true },
    });

    /*console.log(availableStagesAndCourses[0]);
    
    console.log({ availableStagesAndCourses });*/

    if (EnrollmentStatus.length == 0) {
      console.log("No enrollments, so course = 0");
      const result = await prisma.stage.findMany({
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

      //console.log(result[0].course[0].subject);

      const availableSubjects: SubjectAllowToEnroll = {
        seminarian_id: id,
        stage: result[0].description,
        course: result[0].course.map((course) => ({
          description: course.description,
          subject: course.subject.map((subject) => ({
            id: subject.id,
            name: subject.description,
            semester: subject.semester,
          })), // Empty array to match the interface
        })),
      };
      console.log( availableSubjects.course[0] );
      return availableSubjects;
    } else {
        return {}
    }
  }
}

interface SubjectAllowToEnroll {
  seminarian_id: string;
  stage: string;
  course: {
    description: string;
    subject: {
        id: number,
        name: string,
        semester: number
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