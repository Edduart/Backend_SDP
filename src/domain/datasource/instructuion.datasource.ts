import { CreateInstruction, InstructionEntity } from "..";

export abstract class InstructionDatasource {
    abstract Create(data: CreateInstruction): Promise<InstructionEntity>;
}