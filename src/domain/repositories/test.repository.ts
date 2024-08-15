import { TestEntity } from "../entities";
import { CreateTestDto, GetTestDto, UpdateTestDto } from "../dtos";

export abstract class TestRepository {
  abstract create(dto: CreateTestDto): Promise<TestEntity>;
  abstract get(dto: GetTestDto): Promise<object>;
  abstract update(dto: UpdateTestDto): Promise<TestEntity>;
  abstract delete(id: number): Promise<TestEntity>;
}
