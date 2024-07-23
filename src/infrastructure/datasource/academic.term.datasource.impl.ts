import { prisma } from "../../data/postgres";
import { AcademicTermDatasource, AcademicTermEntityt, CreateAcademicTerm } from "../../domain";

export class AcademicTermDataSourceImpl implements AcademicTermDatasource {

    async create(dto: CreateAcademicTerm): Promise<AcademicTermEntityt> {
        const result = await prisma.academic_term.create({
            data: dto
        });
        return AcademicTermEntityt.fromObject(result);
    }
}