import { prisma } from "../../data/postgres";
import { CreateInstruction, InstructionDatasource, InstructionEntity } from "../../domain";

export class InstructionDataSourceImple implements InstructionDatasource{
    async Create(data: CreateInstruction): Promise<InstructionEntity> {
        const check_if_already_exists = await prisma.instruction.findFirst({
            where:{
                subject_id: data.subject_id,
                academic_term_id: data.academic_term_id
            }
        })
        if (check_if_already_exists != null) throw new Error("Acadenuc Term ya existe");
        const result_created = await prisma.instruction.create({data: data});
        return InstructionEntity.fromObject(result_created);
    }

}