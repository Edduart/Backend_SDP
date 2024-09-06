import { prisma } from "../../data/postgres";
import { HorarioDatasource, HorarioEntity, UpdateHorario } from "../../domain";

export class HorarioDataSourceImplementation implements HorarioDatasource {
    async get(id?: number): Promise<HorarioEntity[]> {
        const results = await prisma.horarios.findMany({
            where:{
                ID: id
            }
        })
        const horarios: HorarioEntity[] = results.map((element)=>{
            return HorarioEntity.fromObject(element)
        })
        return horarios;
    }
    async updateById(data: UpdateHorario): Promise<HorarioEntity> {
        const result = await prisma.horarios.update({
            where:{
                ID: data.id
            }, data: data
        })
        return HorarioEntity.fromObject(result)
    }
    
}