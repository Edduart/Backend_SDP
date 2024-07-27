import { CreateInstruction, InstructionEntity, InstructionRepository } from "../..";

export interface CreateInstructionUse {
    execute(data: CreateInstruction): Promise<InstructionEntity>;
}
  
export class CreateInstructionUseCase implements CreateInstructionUse {
    constructor(private readonly repository: InstructionRepository) {}
  
    execute(data: CreateInstruction): Promise<InstructionEntity> {
      return this.repository.Create(data);
    }
}