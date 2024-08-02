import { academic_term_status } from "@prisma/client";
import { prisma } from "../../data/postgres";
import { AcademicTermDatasource, AcademicTermEntityt, CreateAcademicTerm, GetAcademicTerm, UpdateAcademicTerm } from "../../domain";

export class AcademicTermDataSourceImpl implements AcademicTermDatasource {
    async PassSemester(id: number): Promise<AcademicTermEntityt> {
        const find = await prisma.academic_term.findFirst({where:{id:id}});
        if(find == null) throw new Error("El periodo academico no existe");
        const result = await prisma.academic_term.update({
            where:{id: id},
            data:{
                semester: 2
            }
        });
        return AcademicTermEntityt.fromObject(result);
    }
    async EndAcademicTerm(id: number): Promise<AcademicTermEntityt> {
        const find = await prisma.academic_term.findFirst({where:{id:id}});
        console.log(find);
        if(find == null) throw new Error("El periodo academico no existe");
        const result = await prisma.academic_term.update({
            where:{id: id},
            data:{
                status: academic_term_status.CULMINADO
            }
        });
        return AcademicTermEntityt.fromObject(result);
    }
    async ActivateAcademicTerm(id: number): Promise<AcademicTermEntityt> {
        const find = await prisma.academic_term.findFirst({where:{id:id}});
        if(find == null) throw new Error("El periodo academico no existe");
        const result = await prisma.academic_term.update({
            where:{id: id},
            data:{
                status: academic_term_status.ACTIVO
            }
        });
        return AcademicTermEntityt.fromObject(result);
    }
    async Update(data: UpdateAcademicTerm): Promise<AcademicTermEntityt> {
        const find = await prisma.academic_term.findFirst({where:{id:data.id}});
        if(find == null) throw new Error("El periodo academico no existe");
        const result = await prisma.academic_term.update({
            where:{
                id: data.id
            }, data: {
                start_date: data.start_date,
                end_date: data.end_date
            }});
        return AcademicTermEntityt.fromObject(result);
    }
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
            {id: data.id}
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