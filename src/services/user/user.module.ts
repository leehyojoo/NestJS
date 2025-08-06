/** 
 user.module.ts
 * 사용자 모듈
 * 이 모듈은 사용자 관련 서비스와 컨트롤러를 포함
 * 사용자 생성, 조회, 삭제 등의 기능을 제공
*/

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "src/controllers/user.controller";
import { User } from "src/models/entities/user.entity";
import { UserService } from "./user.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([User])
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}