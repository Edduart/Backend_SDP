import {
  CreateProfessor,
  CreateProfessorUseCase,
  GetProfessor,
  ProfessorRepository,
  /*CreateUserDto,
  CreateUser,*/
  UserRepository,
} from "../../domain";
import { Request, Response } from "express";
import { parsePersonData, parseUserData } from "../utils/parseData";
import { CreateUser, UpdatePersonFunc } from "../../infrastructure";

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
    
    //const personData = await parseUserData(req);
    const personData = await parsePersonData(req.body.data, req.body.ayuda);


    //await CreateUser(data.user);

    const newUser = await parseUserData(req.body.data, personData);
    const professorData = new CreateProfessor(personData, newUser);
    const newProfessor = await new CreateProfessorUseCase(
      this.repository
    ).execute(professorData);

    /*const [error, createUserDto] = CreateUserDto.create(userData);
    if (error) return res.status(400).json({ error });
    const newUserData = await new CreateUser(this.userRepository).execute(
      createUserDto!
    );*/

    /*const newProfessor = await new CreateProfessorUseCase(this.repository).execute(
        professorData
      );*/

    res.json({ professor: newProfessor });
  };
}
