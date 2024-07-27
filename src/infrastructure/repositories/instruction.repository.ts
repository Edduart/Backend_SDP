import { CreateInstruction, InstructionDatasource, InstructionEntity, InstructionRepository } from "../../domain";

export class InstructionRepositoryImpl implements InstructionRepository {
    constructor(private readonly datasource: InstructionDatasource) {}
    Create(data: CreateInstruction): Promise<InstructionEntity> {
        return this.datasource.Create(data);
    }

}