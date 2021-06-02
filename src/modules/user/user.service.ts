import { Injectable } from '@nestjs/common';
import { getRepository } from "typeorm";
import { UserEntity } from "./user.entity";
@Injectable()
export class UserService {

    async getUsers() {
        return await getRepository(UserEntity)
            .createQueryBuilder("user")
            .getMany()
    }
}
