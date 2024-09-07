import { BitacoraLog, BitacoraRepository } from "../..";

export interface CreateBitacoreUseCase {
    execute(dto: BitacoraLog): Promise<null>;
}
  
  export class CreateLog implements CreateBitacoreUseCase {
    constructor(private readonly repository: BitacoraRepository) {}
  
    execute(dto: BitacoraLog): Promise<null> {
      return this.repository.create(dto);
    }
}