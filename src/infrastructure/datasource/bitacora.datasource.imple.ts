import { prisma } from "../../data/postgres";
import { BitacoraDatasource, BitacoraLog, GetBitDTO } from "../../domain";

export class BitacoraDataSourceImpl implements BitacoraDatasource {
    async create(dto: BitacoraLog): Promise<null> {
        const result = await prisma.bitacora.create({data: dto});
        return null
    }
    async Get(data: GetBitDTO): Promise<BitacoraLog[]> {
        const resultuts = await prisma.bitacora.findMany({
            where:{
                ID: data.id,
                User_id: data.User_id,
                table: data.table,
                action: data.action,
                date: {
                    gte: data.date1,
                    lt: data.date2,
                },
                
            }
        })
        const resulkt_entities: BitacoraLog[] = resultuts.map((actual)=>{
            return BitacoraLog.fromObject(actual);
        })
        return resulkt_entities;
    }
}