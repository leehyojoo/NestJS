/*
/src/models/dto/update-board.dto.ts
 * 게시판 글 수정 DTO
 * 게시판 글 수정 시 필요한 데이터 구조를 정의
 * Swagger 문서화에 사용되는 DTO로, API 문서에서 게시글 수정 시 필요한 필드를 명시
*/

import { PickType } from "@nestjs/swagger";
import { Board } from "../entities/board.entity";

export class UpdateBoardDto extends PickType(Board, [
    'title',
    'description',
]) {}