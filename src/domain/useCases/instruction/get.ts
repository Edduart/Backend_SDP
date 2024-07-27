import { GetInstruction, InstructionEntity, InstructionRepository } from "../..";

export interface GetInstructionUse {
    execute(data: GetInstruction): Promise<InstructionEntity[]>;
}
  
export class GetInstructionUseCase implements GetInstructionUse {
    constructor(private readonly repository: InstructionRepository) {}
  
    execute(data: GetInstruction): Promise<InstructionEntity[]> {
      return this.repository.Get(data);
    }
}