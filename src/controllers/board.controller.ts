/*
/src/controllers/board.controller.ts
 * 게시판 관련 컨트롤러
 * 게시판 글 작성, 수정, 삭제 등의 엔드포인트를 정의
 * 이 컨트롤러는 서비스 레이어를 호출하여 비즈니스 로직을 수행
*/

import { Body, Controller, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { BoardService } from "../services/board/board.service";
import { CreateBoardDto } from "../models/dto/create-board.dto";
import { UpdateBoardDto } from "../models/dto/update-board.dto";
import { Param } from "@nestjs/common/decorators/http/route-params.decorator";
import { DeleteStatus } from "src/commons/enums/delete-status.enum"; 
import { Board } from "src/models/entities/board.entity";
import { User } from "src/models/entities/user.entity";
import { AuthGuard } from "@nestjs/passport";
import { Req } from "@nestjs/common/decorators/http/route-params.decorator";


@Controller('boards')
export class BoardController {
    constructor(private readonly boardService: BoardService) {}

    @ApiOperation({ description: '게시판 글 작성' })
    @ApiOkResponse({ description: '생성된 게시글 조회', type: Board })
    @UseGuards(AuthGuard('jwt'))
    @Post('')
    async createBoard(@Req() req: { user: User }, @Body() createBoardDto: CreateBoardDto): Promise<Board> {
        return await this.boardService.createBoard(req.user, createBoardDto);
    }

    @ApiOperation({ description: '게시판 글 수정' })
    @ApiOkResponse({ description: '수정된 게시글 조회', type: Board })
    @UseGuards(AuthGuard('jwt'))
    @Patch(':id')
    async updateBoard(@Req() req: { user: User }, @Param('id') id: number, @Body() updateBoardDto: UpdateBoardDto): Promise<Board> {
        return await this.boardService.updateBoard(req.user, id, updateBoardDto);
    }
}
