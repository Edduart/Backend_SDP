import { HorarioDatasource, HorarioEntity, HorarioRepository, UpdateHorario } from "../../domain";


export class HorarioRepositoryImpl implements HorarioRepository {
    constructor(private readonly dataSource: HorarioDatasource) {}
    get(id?: number): Promise<HorarioEntity[]> {
        return this.dataSource.get(id);
    }
    updateById(data: UpdateHorario): Promise<HorarioEntity> {
        return this.dataSource.updateById(data)
    }

}