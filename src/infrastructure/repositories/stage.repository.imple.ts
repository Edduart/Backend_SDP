import { StageDataSource, StageEntity, StageRepository, Login } from "../../domain";


export class StageRepositoryImpl implements StageRepository {
  constructor(private readonly datasource: StageDataSource) {}

  getAll(): Promise<StageEntity[]> {
    return this.datasource.getAll();
  }
  findById(id: number): Promise<StageEntity> {
    return this.datasource.findById(id);
  }
  /*ChangePassword(data: Login): Promise<String> {
    return this.datasource.ChangePassword(data);
  }
  Login(data: Login): Promise<UserEntity> {
    return this.datasource.Login(data);
  }*/
}
