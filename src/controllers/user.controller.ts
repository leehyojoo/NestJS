/*
user.controller.ts
    사용자 컨트롤러 클래스
    이 클래스는 사용자 관련 HTTP 요청을 처리
    사용자 생성, 조회, 삭제 등의 엔드포인트를 제공
*/

import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Response } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { DeleteStatus } from '../commons/enums/delete-status.enum';
import { CreateUserDto } from 'src/models/dto/create-user.dto';
import { User } from 'src/models/entities/user.entity';
import { UserService } from 'src/services/user/user.service';



@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}
    
    /**
     * ## 사용자 생성 엔드포인트
     * @param createUserDto 사용자 생성 DTO (Data Transfer Object)
     * @returns 생성된 사용자 객체
     * @throws {BadRequestException} 이미 동일한 이메일이 존재할 경우
     */
    @ApiOperation({ summary: '회원가입' })
    @Post()
    @ApiOkResponse({ description: '사용자 생성 성공', type: User })
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.userService.createUser(createUserDto);
    } 

    /**
     * ## 사용자 삭제 엔드포인트
     * @param id 삭제할 사용자의 ID
     * @returns 삭제 결과 객체
     * @throws {NotFoundException} 해당 ID의 사용자가 없을 경우
     * @throws {DeleteStatus} 사용자 삭제 상태 (성공 또는 실패)
     * */
    @ApiOperation({ summary: '회원탈퇴' })
    @Delete(':id')
    @ApiOkResponse({ description: '성공 여부 반환', type: String })
    async deleteUser(@Param('id') id: number): Promise<DeleteStatus> {
        const status: DeleteStatus = await this.userService.deleteUser(id);
        if (status === DeleteStatus.Fail) {
            throw new NotFoundException('사용자가 없습니다.');
        }
        return status
    }

    /**
     * ## 이메일로 사용자 조회 엔드포인트
     * @param email 검색할 사용자의 이메일
     * @returns 사용자 객체 또는 null
     */
    @Get('email/:email')
    async findOneUserByEmail(@Param('email') email: string): Promise<User | null> {
        return await this.userService.findOneUserByEmail(email);
    }
    /**
     * ## ID로 사용자 조회 엔드포인트
     * @param id 검색할 사용자의 ID
     * @returns 사용자 객체 또는 null
     * */
    @ApiOperation({ summary: '회원 단건 조회' })
    @Get(':id')
    @ApiOkResponse({ description: '사용자 데이터 반환', type: User })
    async findOneUser(@Param('id') id: number): Promise<User> {
        const user = await this.userService.findOneUserById(id);
        if (!user || user == null) {
            throw new NotFoundException('존재하지 않는 사용자입니다.');
        }
        return user;
    }
}
