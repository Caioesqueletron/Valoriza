import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepository";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IComplimentTequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

class CreateComplimentService {
  async execute({
    tag_id,
    user_sender,
    user_receiver,
    message,
  }: IComplimentTequest) {
    const complimentsRepositories = getCustomRepository(
      ComplimentsRepositories
    );
    const usersRepositories = getCustomRepository(UsersRepositories);

    if (user_sender === user_receiver) {
      throw new AppError("User can not send to himself !");
    }

    const userReceiverExists = await usersRepositories.findOne(user_receiver);

    if (!userReceiverExists) {
      throw new AppError("User Receiver does not exists!");
    }

    const compliment = complimentsRepositories.create({
      tag_id,
      user_receiver,
      user_sender,
      message,
    });

    await complimentsRepositories.save(compliment);
   
    return compliment;
  }
}

export { CreateComplimentService };
