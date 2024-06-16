import { SocialMediaCategoryEntity } from "../../entities";
import { WorkerRepository } from "../../repositories";

export interface GetSocialUseCase{
    execute(): Promise<SocialMediaCategoryEntity[]>;
}

export class GetSocials implements GetSocialUseCase {
    constructor(private readonly repository: WorkerRepository) {}
  
    execute(): Promise<SocialMediaCategoryEntity[]> {
      return this.repository.GetSocial();
    }
  }