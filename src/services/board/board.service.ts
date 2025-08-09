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
import { DeleteStatus } from "src/commons/enums/delete-status.enum";

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

    // 게시글 삭제 메소드
    // 삭제의 경우에는 dto를 사용하지 않고, 단순히 ID로 삭제를 처리
    // @param user 게시글 작성자 정보
    // @param id 삭제할 게시글 ID
    // @returns 삭제 상태 (성공/실패)
    async deleteBoard(user: User, id: number): Promise<DeleteStatus> {
        const existBoard = await this.boardRepository.findOne({where: {id: id, user: user}});
        if (existBoard == null) {
            return DeleteStatus.Fail;
        }
        await this.boardRepository.delete(id);
        return DeleteStatus.Success;
    }

    // 게시글 조회 메소드
    // @param id 조회할 게시글 ID
    // @returns 조회된 게시글 정보
    // @throws NotFoundException 존재하지 않는 게시글일 경우 예외 발생
    // 예외 처리는 Controller, Service 레이어에서 처리할 수 있다. 
    // 보통 책임이 어디에 있느냐에 따라 다르지만, 비즈니스 로직을 처리하는 와중에는 Service 레이어,
    // 사용자 요청에 대한 응답을 처리하는 과정에서는 Controller 레이어에서 예외를 처리하는 것이 일반적
    async findOneBoard(id: number): Promise<Board> {
        const board = await this.boardRepository.findOne({where: {id: id}});
        if (board == null) {
            throw new NotFoundException('해당 게시물이 없습니다.');
        }
        return board;
    }

    // 게시글 전체 조회 메소드
    // @returns 전체 게시글 목록
    // 이 메소드는 게시판의 모든 게시글을 조회하는 기능을 제공
    async findAllBoards(): Promise<Board[]> {
        return await this.boardRepository.find();
    }

}