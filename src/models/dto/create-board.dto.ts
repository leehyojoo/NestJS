/*
/src/models/dto/create-board.dto.ts
 * 게시판 글 작성 DTO
 * 게시판 글 작성 시 필요한 데이터 구조를 정의
 * Swagger 문서화에 사용되는 DTO로, API 문서에서 게시글 작성 시 필요한 필드를 명시
*/

import { PickType } from "@nestjs/swagger";
import { Board } from "../entities/board.entity";

export class CreateBoardDto extends PickType(
    Board,
    [
        'title',
        'description',
    ]) 
{}
