import {
  CreateParishDto,
    ParishDataSource,
    ParishEntity,
    ParishRepository,
    UpdateParishDto
    } from "../../domain";
  
  export class ParishRepositoryImpl implements ParishRepository {
    constructor(private readonly datasource: ParishDataSource) {}
  
    getAll(): Promise<ParishEntity[]> {
      return this.datasource.getAll();
    }
  
    findById(id: number): Promise<ParishEntity> {
      return this.datasource.findById(id);
    }
    updateById(updateParishDto:UpdateParishDto): Promise<ParishEntity> {
      return this.datasource.updateById(updateParishDto);
    }
    create(CreateParishDto:CreateParishDto): Promise<ParishEntity> {
      return this.datasource.create(CreateParishDto);
    }

    Delete(id: number) {
      return this.datasource.delete(id);
    }
  }
  
  