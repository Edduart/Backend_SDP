import { academic_term_status } from "@prisma/client";
import { prisma } from "../../data/postgres";
import { AcademicTermDatasource, AcademicTermEntityt, CreateAcademicTerm, GetAcademicTerm } from "../../domain";

export class AcademicTermDataSourceImpl implements AcademicTermDatasource {
    async GetByID(data: GetAcademicTerm): Promise<AcademicTermEntityt> {
        const results = await prisma.academic_term.findFirst({
            where: {id:data.id}
        });
        if (results == null)throw new Error("ID Does not exists")
        const entity = AcademicTermEntityt.fromObject(results);
        return entity;
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
    async Update(id: number): Promise<AcademicTermEntityt> {
        const find = await prisma.academic_term.findFirst({where:{id:id}});
        if(find == null) throw new Error("El periodo academico no existe");
        let number= 1;
        if(find.semester == 1)number = 2;
        const result = await prisma.academic_term.update({
            where:{
                id: id
            }, data: {
                semester: number
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
        try{
            const result = await prisma.$transaction(async (tx)=>{
                const result = await prisma.academic_term.create({
                    data: dto
                });
                const materias = await prisma.subject.findMany({
                    where:{status:true}, select:{id: true}})
                const data = materias.map((actual)=>{
                    return {
                        academic_term_id: result.id,
                        subject_id: actual.id,
                        professor_id: null
                    }
                })
                await prisma.instruction.createMany({
                    data: data,
                });
                return result;
            })
            return AcademicTermEntityt.fromObject(result);
        }catch(error){
            throw new Error("somenthin went wrong" + error)
        }
    }
}