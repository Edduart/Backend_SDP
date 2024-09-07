import { BitacoraLog, GetBitDTO } from "..";

export abstract class BitacoraRepository {
    abstract create(dto: BitacoraLog): Promise<null>;

    abstract Get(data: GetBitDTO): Promise<BitacoraLog[]>;
}