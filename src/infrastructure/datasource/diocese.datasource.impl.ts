//This is the controller 
import { prisma } from "../../data/postgres";


import { DioceseDatasource } from "../../domain/datasource/diocese.datasource";
import { DioceseEntity } from "../../domain/entities/diocese.entity";


export class DioceseDatasourceImpl implements DioceseDatasource {
    create(): Promise<DioceseEntity> {
        throw new Error("Method not implemented.");
    }

    async getAll(): Promise<DioceseEntity[]> {
        const dioceses = await prisma.diocese.findMany();
        return dioceses.map( (diocese: { [key: string]: any; }) => DioceseEntity.fromObject(diocese));
    }

    findById(id: number): Promise<DioceseEntity> {
        throw new Error("Method not implemented.");
    }

    updateById(): Promise<DioceseEntity> {
        throw new Error("Method not implemented.");
    }

    deleteById(id: number): Promise<DioceseEntity> {
        throw new Error("Method not implemented.");
    }

}