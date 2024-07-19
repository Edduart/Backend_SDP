import { CreateDegree } from "../..";

export class UpdateUserDto {
  constructor(
    public readonly person_id: string,
    public readonly status: boolean,
    public readonly degree: CreateDegree[] | undefined,
    public readonly parish_id: number,
    public readonly role_id: number,
    public readonly password?: string
  ) {}
}