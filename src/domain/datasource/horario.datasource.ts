import { UpdateHorario } from "../dtos";
import { HorarioEntity } from "../entities";

export abstract class HorarioDatasource {
    abstract get(id?: number): Promise<HorarioEntity[]>;
    abstract updateById(data: UpdateHorario): Promise<HorarioEntity>;
}
  