/*
user.service.ts
    사용자 서비스 클래스
    이 클래스는 사용자 관련 비즈니스 로직을 처리
    사용자 생성, 조회, 삭제 등의 기능을 제공
*/

import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "src/models/dto/create-user.dto";
import { User } from "src/models/entities/user.entity";
import { DeleteStatus } from "src/commons/enums/delete-status.enum";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    /**
     * ## 새로운 사용자를 생성
     * @param createUserDto 사용자 생성을 위한 DTO (Data Transfer Object)
     * @returns 생성된 사용자 객체
     * @throws {BadRequestException} 이미 동일한 이메일이 존재할 경우
     */
    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const existUser = await this.userRepository.findOne({
            where: { email: createUserDto.email },
        });

        if (existUser) {
            throw new BadRequestException('이미 존재하는 사용자입니다.');
        }
        const createdUser = this.userRepository.create(createUserDto);
        return await this.userRepository.save(createdUser);
    }

    /**
     * ## 특정 사용자를 삭제 
     * @param id 삭제할 사용자의 ID
     * @returns 삭제 결과 객체
     * @throws {NotFoundException} 해당 ID의 사용자가 없을 경우
     * @throws {DeleteStatus} 사용자 삭제 상태 (성공 또는 실패)
     */
    async deleteUser(id: number): Promise<DeleteStatus> {
        const user = await this.userRepository.findOne({ where: {id:id} });
        if (!user || user == null) {
            return DeleteStatus.Fail;
        }
        await this.userRepository.delete(id);
        return DeleteStatus.Success;
    }

    /**
     * ## 이메일로 특정 사용자를 조회
     */
    async findOneUserByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findOne({ where: { email } });
    }

    /**
     * ## ID로 특정 사용자를 조회
     */
    async findOneUserById(id: number): Promise<User | null> {
        return await this.userRepository.findOne({ where: {id: id} });
    }
}