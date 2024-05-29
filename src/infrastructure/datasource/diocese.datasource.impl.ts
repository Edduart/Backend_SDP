//This is the controller 
import { prisma } from "../../data/postgres";


import { dioceseDatasource } from "../../domain/datasource/diocese.datasource";
import { dioceseEntity } from "../../domain/entities/diocese.entity";


export class dioceseDatasourceImpl implements dioceseDatasource {
    create(): Promise<dioceseEntity> {
        throw new Error("Method not implemented.");
    }

    async getAll(): Promise<dioceseEntity[]> {
        const dioceses = await prisma.diocese.findMany();
        return dioceses.map( diocese => dioceseEntity.fromObject(diocese));
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