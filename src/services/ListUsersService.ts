import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";


class ListUsersServices {
    async execute() {
        const usersRepositories = getCustomRepository(UsersRepositories);
    
        const users = await usersRepositories.find({
          select:['created_at','email','name','updated_at','id']
        });
    
        return users;
      }
}


export {ListUsersServices}