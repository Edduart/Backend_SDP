export class UpdateCourseDto {
  private constructor(
    public readonly id: number,
    public readonly instructor_id: string
  ) {}
  static update(props: { [key: string]: any }): [string?, UpdateCourseDto?] {
    const { id, instructor_id } = props;
    if (!id || isNaN(Number(id))) {
      return ["Id must be a number > 0 and integer"];
    }

    if (instructor_id !== null) {
      if (typeof instructor_id !== "string") {
        return ["Instructor ID must be a string"];
      } else {
         if (!/^(V|E)-\d{1,18}$/.test(instructor_id)) return ["Instructor ID must follows this format: V-xxxxxx"];
      }
    }
    return [undefined, new UpdateCourseDto(id, instructor_id)];
  }
}
