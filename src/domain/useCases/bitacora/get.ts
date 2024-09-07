import { BitacoraLog, BitacoraRepository, GetBitDTO } from "../..";

export interface GetBitacoreUseCase {
    execute(dto: GetBitDTO): Promise<BitacoraLog[]>;
}
  
  export class CreateLog implements GetBitacoreUseCase {
    constructor(private readonly repository: BitacoraRepository) {}
  
    execute(dto: GetBitDTO): Promise<BitacoraLog[]> {
      return this.repository.Get(dto);
    }
}