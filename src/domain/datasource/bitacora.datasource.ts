import { GetBitDTO } from "..";
import { BitacoraLog } from "../entities";

export abstract class BitacoraDatasource {
    abstract create(dto: BitacoraLog): Promise<null>;

    abstract Get(data: GetBitDTO): Promise<BitacoraLog[]>;
}