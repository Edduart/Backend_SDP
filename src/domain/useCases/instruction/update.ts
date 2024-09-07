import { CreateInstruction, InstructionEntity, InstructionRepository } from "../..";

export interface UpdateInstructionUse {
    execute(data: CreateInstruction): Promise<InstructionEntity>;
}
  
export class CreateInstructionUseCase implements UpdateInstructionUse {
    constructor(private readonly repository: InstructionRepository) {}
  
    execute(data: CreateInstruction): Promise<InstructionEntity> {
      return this.repository.Create(data);
    }
}