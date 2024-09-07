import { UpdateHorario } from "../../dtos";
import { HorarioEntity } from "../../entities";
import { HorarioRepository } from "../../repositories";

export interface HorarioUseUpdate {
    execute(data: UpdateHorario): Promise<HorarioEntity>;
}
  
export class HorarioUpdateUseCase implements HorarioUseUpdate {
    constructor(private readonly repository: HorarioRepository) {}
  
    execute(data: UpdateHorario): Promise<HorarioEntity> {
      return this.repository.updateById(data);
    }
}