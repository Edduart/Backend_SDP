export class SubjectAllowToEnrollEquivalencyDto {
  constructor(public seminarian_id?: string) {}

  static get(props: {
    [key: string]: any;
  }): [string[]?, SubjectAllowToEnrollEquivalencyDto?] {
    let { seminarian_id } = props;
    let dataErrors: string[] = [];

    // TODO reWork validations

    if (dataErrors.length > 0) return [dataErrors];
    return [undefined, new SubjectAllowToEnrollEquivalencyDto(seminarian_id)];
  }
}
