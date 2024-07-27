import { CreateInstruction, InstructionEntity } from "..";

export abstract class InstructionRepository{
    abstract Create(data: CreateInstruction): Promise<InstructionEntity>;
}