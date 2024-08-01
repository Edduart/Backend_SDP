import { CreateInstruction, GetInstruction, InstructionDatasource, InstructionEntity, InstructionRepository } from "../../domain";

export class InstructionRepositoryImpl implements InstructionRepository {
    constructor(private readonly datasource: InstructionDatasource) {}
    Get(data: GetInstruction): Promise<InstructionEntity[]> {
        return this.datasource.Get(data);
    }
    Create(data: CreateInstruction): Promise<InstructionEntity> {
        return this.datasource.Create(data);
    }

}