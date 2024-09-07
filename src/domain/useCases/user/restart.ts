import { UserRepository } from "../..";

export interface RestartUseCase{
    execute(id: string): Promise<String>;
}

export class Restart_use implements RestartUseCase {
    constructor(private readonly repository: UserRepository) {}
    execute(id: string): Promise<String> {
      return this.repository.RestartPassword(id);
    }
}