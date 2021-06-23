import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { TagsRepositories } from "../repositories/TagsRepositories";

class CreateTagService {
  async execute(name: string) {
    const tagRepositories = getCustomRepository(TagsRepositories);
    if (!name) {
      throw new AppError("Incorrect name!");
    }

    const tagAlreadyExists = await tagRepositories.findOne({
      name,
    });

    if (tagAlreadyExists) {
      throw new AppError("Tag already exists!");
    }

    const tag = tagRepositories.create({
      name,
    });
    await tagRepositories.save(tag);

    return tag;
  }
}

export default CreateTagService ;
