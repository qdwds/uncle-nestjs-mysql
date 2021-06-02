import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { UserController } from "./user.controller";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from "./user.entity";

@Module({
    imports: [
        //  只用注入的实体。才能对实体进行操作
        TypeOrmModule.forFeature([
            UserEntity,
        ]),
        
    ],
    controllers: [
        UserController
    ],
    providers: [
        UserService,
    ],
})
export class UserModule { }
