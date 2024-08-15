import {
    TestRepository,
    TestDataSource,
    CreateTestDto,
    GetTestDto,
    TestEntity,
    UpdateTestDto
} from "../../domain";

export class TestRepositoryImpl implements TestRepository {
  constructor(private readonly dataSource: TestDataSource) {}
    create(dto: CreateTestDto): Promise<TestEntity> {
        return this.dataSource.create(dto);
    }
    get(dto: GetTestDto): Promise<object> {
        return this.dataSource.get(dto);
    }
    update(dto: UpdateTestDto): Promise<TestEntity> {
        return this.dataSource.update(dto);
    }
    delete(id: number): Promise<TestEntity> {
        return this.dataSource.delete(id);
    }
}
