/*
/src/services/board/board.service.ts
    * 게시판 서비스
    * 게시판 글 작성, 수정, 삭제 등의 비즈니스 로직을 처리하는 서비스
    * TypeORM을 사용하여 데이터베이스와 상호작용
    * 이 서비스는 컨트롤러에서 호출되어 게시판 관련 기능을 수행
*/

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Board } from "src/models/entities/board.entity";
import { User } from "src/models/entities/user.entity";
import { CreateBoardDto } from "src/models/dto/create-board.dto";
import { UpdateBoardDto } from "src/models/dto/update-board.dto";
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception";


@Injectable()
export class BoardService {
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>;

    async createBoard(user: User, createBoardDto: CreateBoardDto): Promise<Board> {
        const board = this.boardRepository.create({
            ...createBoardDto,
            user: user, // 게시글 작성자 정보 설정
        });
        return await this.boardRepository.save(board);
    }

    // 게시글 수정 메소드
    // @param user 게시글 작성자 정보
    // @param id 수정할 게시글 ID
    async updateBoard(user: User, id:number, updateBoardDto: UpdateBoardDto): Promise<Board> {
        const existBoard = await this.boardRepository.findOne({where: {id: id, user: user}});
        if (existBoard == null) {
            throw new NotFoundException('해당 게시물이 없습니다.');
        }
        await this.boardRepository.update(existBoard.id, updateBoardDto);
        const updatedBoard = await this.boardRepository.findOne({where: {id: id}});
        if (updatedBoard == null) {
            throw new NotFoundException('수정에 실패하였습니다.');
        }
        return updatedBoard;
    }

}