import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { createDiocese } from "../../domain/dtos";
import { 
    GetDioceses, 
    dioceseRepository 
} from "../../domain";

export class dioceseController {
  //* DI
  constructor(private readonly dioceseRepository: dioceseRepository) {}

  public getDioceses = (req: Request, res: Response) => {

    new GetDioceses(this.dioceseRepository)
      .execute()
      .then((todos) => res.json(todos)) //check parameter
      .catch((error) => res.status(400).json({ error }));
  };

  /*public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id;

    new GetTodo(this.todoRepository)
      .execute(id)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error }));
  };

  public createTodo = (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new CreateTodo(this.todoRepository)
      .execute(createTodoDto!)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error }));
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });
    if (error) return res.status(400).json({ error });

    new UpdateTodo(this.todoRepository)
      .execute(updateTodoDto!)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error }));
  };

  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;

    new DeleteTodo(this.todoRepository)
      .execute(id)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error }));
  };*/
}
