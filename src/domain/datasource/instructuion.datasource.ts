import { CreateInstruction, GetInstruction, InstructionEntity } from "..";

export abstract class InstructionDatasource {
    abstract Create(data: CreateInstruction): Promise<InstructionEntity>;
    abstract Get(data: GetInstruction): Promise<InstructionEntity[]>;
}