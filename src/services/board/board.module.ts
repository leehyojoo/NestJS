/*
/src/services/board/board.module.ts
    * 게시판 모듈
    * 게시판 관련 엔티티, 서비스, 컨트롤러를 포함
    * 게시판 글 작성, 수정, 삭제 등의 기능을 제공
*/

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtStrategy } from "src/auth/jwt.strategy";
import { BoardController } from "src/controllers/board.controller";
import { Board } from "src/models/entities/board.entity";
import { PassportModule } from "@nestjs/passport";
import { BoardService } from "src/services/board/board.service";

@Module({    
    imports: [TypeOrmModule.forFeature([Board]), PassportModule], 
    controllers: [BoardController],
    providers: [BoardService, JwtStrategy],
    exports: []
})
export class BoardModule {}