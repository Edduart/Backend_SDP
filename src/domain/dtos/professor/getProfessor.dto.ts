export class GetProfessorDto {
  constructor(public readonly id?: string, public readonly status?: number) {}

  static GetDto(props: { [key: string]: any }): [string[]?, GetProfessorDto?] {
    const { id, status } = props;
    console.log("🚀 ~ GetProfessorDto ~ GetDto ~ status:", status)
    let dataErrors: string[] = [];
    let statusToNumber: number | undefined;
    if (id != undefined) {
      if (!/^\d{1,20}$/.test(id))
        dataErrors.push("ID must be only numeric and no more than 20 digits ");
    }
    if (status != undefined) {
      statusToNumber = +status;
      console.log("🚀 ~ GetProfessorDto ~ GetDto ~ statusToNumber:", statusToNumber)
      if (
        Number.isNaN(statusToNumber) ||
        !Number.isInteger(statusToNumber) ||
        statusToNumber < 0 ||
        statusToNumber > 1
      )
        dataErrors.push("Status must be a valid number between 0 and 1");
    }
        

    console.log(
      "🚀 ~ GetProfessorDto ~ GetDto ~ statusToNumber:",
      statusToNumber
    );
    if (dataErrors.length > 0) return [dataErrors];
    return [undefined, new GetProfessorDto(id, statusToNumber)];
  }
}
