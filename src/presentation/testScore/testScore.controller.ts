import { Request, Response } from "express";
import { TestScoreRepository, GetTestScoreDto, GetTestScore, CreateTestScoreDto, CreateTestScore, UpdateTestScoreDto,UpdateTestScore } from "../../domain";

import { ValidatePermission } from "../services/permissionValidator";

export class TestScoreController {
  constructor(private readonly repository: TestScoreRepository) {}

  public get = (req: Request, res: Response) => {
    console.log("general get");

    const [error, getDto] = GetTestScoreDto.get(req.query);
    if (error) return res.status(400).json({ error });

    new GetTestScore(this.repository)
      .execute(getDto!)
      .then((testScore) =>
        res.set({ "Access-Control-Expose-Headers": "auth" }).json(testScore)
      )
      .catch((error) => res.status(400).json({ error }));
  };

  public create = (req: Request, res: Response) => {
    try{
      const result = ValidatePermission(req.body.Permisos, "TEST", "C");
    }catch(error){
      return res.status(401).json("Not allowed" + error);
    }
    const [error, createDto] = CreateTestScoreDto.create(req.body);
    if (error)
      return res.status(400).json({ msj: "Data validation errors", error });

    new CreateTestScore(this.repository)
      .execute(createDto!)
      .then((testScore) =>
        res
          .set({ "Access-Control-Expose-Headers": "auth" })
          .json({ msj: "Test Score creation successful", testScore })
      )
      .catch((error) => res.status(400).json({ error }));
  };


  public update = (req: Request, res: Response) => {
    try{
      const result = ValidatePermission(req.body.Permisos, "TEST", "U");
    }catch(error){
      return res.status(401).json("Not allowed" + error);
    }
    const [error, updateDto] = UpdateTestScoreDto.update(req.body);
    if (error) return res.status(400).json({ error });
    new UpdateTestScore(this.repository)
      .execute(updateDto!)
      .then((test) =>
        res.set({ "Access-Control-Expose-Headers": "auth" }).json({
          msj:
            "Test score updated!",
          test,
        })
      )
      .catch((error) => res.status(400).json({ error }));
  };
}
