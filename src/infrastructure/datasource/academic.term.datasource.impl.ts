import { academic_term_status } from "@prisma/client";
import { prisma } from "../../data/postgres";
import { AcademicTermDatasource, AcademicTermEntityt, CreateAcademicTerm, GetAcademicTerm } from "../../domain";

export class AcademicTermDataSourceImpl implements AcademicTermDatasource {
    async Get(data: GetAcademicTerm): Promise<AcademicTermEntityt[]> {
        let whereClause = {};
        if (data.fecha != undefined) {
        const startOfYear = new Date(data.fecha.getFullYear(), 0, 1);
        const endOfYear = new Date(data.fecha.getFullYear() + 1, 0, 1);
        whereClause = {
            OR: [
            {
                start_date: {
                gte: startOfYear,
                lt: endOfYear,
                },
            },
            {
                end_date: {
                gte: startOfYear,
                lt: endOfYear,
                },
            },
            ],
        };
        }

        const results = await prisma.academic_term.findMany({
            where: whereClause
        });
        const entities: AcademicTermEntityt[] = results.map((actual)=>{
            return AcademicTermEntityt.fromObject(actual);
        });
        return entities;
    }

    async create(dto: CreateAcademicTerm): Promise<AcademicTermEntityt> {
        const result = await prisma.academic_term.create({
            data: dto
        });
        return AcademicTermEntityt.fromObject(result);
    }
}