import { GetSeminarianDTO, TestRepository } from "../..";
import { SeminarianListDTO } from "../../dtos/seminarian/seminatian.dto";

interface GetSeminarianListWithNoteInterfaceUsecade {
    execute(data: GetSeminarianDTO): Promise<SeminarianListDTO[]>;
  }
  
  export class GetSeminarianPerNoteUse implements GetSeminarianListWithNoteInterfaceUsecade {
    constructor(private readonly repository: TestRepository) {}
  
    execute(data: GetSeminarianDTO): Promise<SeminarianListDTO[]> {
      return this.repository.GetSeminarianListWithNotes(data);
    }
  }
  