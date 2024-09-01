// TODO clean code and add try and catch, if all is working as intended

export class GetStageOfSeminarianMap {
  public static async mapResult(seminarians: any[]) {

    const seminariansInfo = seminarians.map((item) => ({
      id: item.id,
      name: item.user.person.forename,
      surname: item.user.person.surname,
      stage: item.stage
    }));
      return seminariansInfo;
    }
}
