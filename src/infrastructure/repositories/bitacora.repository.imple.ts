import { BitacoraDatasource, BitacoraLog, BitacoraRepository, GetBitDTO } from "../../domain";

export class BitacoraRepositoryImpl implements BitacoraRepository {
    constructor(private readonly datasource: BitacoraDatasource) {}
    create(dto: BitacoraLog): Promise<null> {
        return this.datasource.create(dto);
    }
    Get(data: GetBitDTO): Promise<BitacoraLog[]> {
        return this.datasource.Get(data);
    }
}