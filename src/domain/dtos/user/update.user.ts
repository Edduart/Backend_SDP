import { CreateDegree } from "../..";

export class UpdateUserDto {
  constructor(
    public person_id: string,
    public degree: CreateDegree[] | undefined,
    public parish_id: number,
    public role_id: number,
    public password?: string,
    public status?: boolean,
  ) {}
}