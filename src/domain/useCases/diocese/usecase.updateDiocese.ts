import { UpdateDioceseDto } from "../../dtos"
import { DioceseEntity,  } from "../../entities/diocese.entity";
import { DioceseRepository } from "../../repositories/diocese.repository";


export interface UpdateDioceseUseCase {
    execute(dto :UpdateDioceseDto) : Promise<DioceseEntity>;
}

export class UpdateDiocese implements UpdateDioceseUseCase {
    constructor(
        private readonly repository: DioceseRepository,
    ){}

    execute(dto: UpdateDioceseDto): Promise<DioceseEntity> {
        return this.repository.updateById(dto);
    }
}