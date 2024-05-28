//This is the controller 

import { dioceseDatasource } from "../../domain/datasource/diocese.datasource";
import { dioceseEntity } from "../../domain/entities/diocese.entity";


export class dioceseDatasourceImpl implements dioceseDatasource {
    create(): Promise<dioceseEntity> {
        throw new Error("Method not implemented.");
    }

    getAll(): Promise<dioceseEntity[]> {
        throw new Error("Method not implemented.");
    }

    findById(id: number): Promise<dioceseEntity> {
        throw new Error("Method not implemented.");
    }

    updateById(): Promise<dioceseEntity> {
        throw new Error("Method not implemented.");
    }

    deleteById(id: number): Promise<dioceseEntity> {
        throw new Error("Method not implemented.");
    }

}