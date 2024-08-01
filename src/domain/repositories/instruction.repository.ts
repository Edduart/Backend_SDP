import { CreateInstruction, GetInstruction, InstructionEntity } from "..";

export abstract class InstructionRepository{
    abstract Create(data: CreateInstruction): Promise<InstructionEntity>;
    abstract Get(data: GetInstruction): Promise<InstructionEntity[]>;
}