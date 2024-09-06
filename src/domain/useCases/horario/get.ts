import { HorarioEntity, HorarioRepository } from "../..";

export interface HorarioUseGet {
    execute(id?: number): Promise<HorarioEntity[]>;
}
  
export class HorarioGetUseCase implements HorarioUseGet {
    constructor(private readonly repository: HorarioRepository) {}
  
    execute(id?: number): Promise<HorarioEntity[]> {
      return this.repository.get(id);
    }
}