import {
  CreatePhone,
  CreateProfessor,
  CreateProfessorUseCase,
  GetProfessor,
  PersonEntity,
  SocialMedia,
  ProfessorRepository,
  CreateUserDto,
  CreateUser,
  UserRepository,
} from "../../domain";
import { Request, Response } from "express";
import { parsePersonData, parseUserData } from "../utils/parseData";

export class ProfessorController {
  constructor(
    private readonly repository: ProfessorRepository,
    private readonly userRepository: UserRepository
  ) {}

  public get = (req: Request, res: Response) => {
    new GetProfessor(this.repository)
      .execute(req.body.id, req.body.status_id)
      .then((professor) => res.json(professor))
      .catch((error) => res.status(400).json({ error }));
  };

  public create = async (req: Request, res: Response) => {

      const userData = await parseUserData(req);
      const { person, socials, phones } = await parsePersonData(req);
      const professorData = new CreateProfessor(person, socials, phones);

      const [error, createUserDto] = CreateUserDto.create(userData);
      if (error) return res.status(400).json({ error });

      const newUserData = await new CreateUser(this.userRepository).execute(
        createUserDto!
      );

      const newProfessor = await new CreateProfessorUseCase(this.repository).execute(
        professorData
      );

      res.json({ user: newUserData, professor: newProfessor });
  };

}
