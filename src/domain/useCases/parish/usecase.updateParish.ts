import { UpdateParishDto } from "../../dtos"
import { ParishEntity,  } from "../../entities/parish.entity";
import { ParishRepository } from "../../repositories/parish.repository";


export interface UpdateParishUseCase {
    execute(dto :UpdateParishDto) : Promise<ParishEntity>;
}

export class UpdateParish implements UpdateParishUseCase {
    constructor(
        private readonly repository: ParishRepository,
    ){}

    execute(dto: UpdateParishDto): Promise<ParishEntity> {
        return this.repository.updateById(dto);
    }
}