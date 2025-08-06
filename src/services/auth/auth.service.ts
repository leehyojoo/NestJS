/*
// src/services/auth/auth.service.ts
    * 사용자 인증 서비스 정의
    * JWT 토큰 생성 및 관리 기능을 포함
    * 사용자 정보를 기반으로 액세스 토큰과 리프레시 토큰을 생성
*/
import { Payload } from "src/auth/payload";
import { Token } from "src/auth/token";
import { LoginDto } from "src/models/dto/login.dto";
import { User } from "src/models/entities/user.entity";
import { UserService } from "../user/user.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {

    // ## 인증 서비스 생성자
    // @param jwtService JWT 서비스 인스턴스
    // @param userService 사용자 서비스 인스턴스
    // 이 서비스는 JWT 토큰 생성 및 사용자 인증을 담당
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) {}

    // ## 사용자 로그인 처리
    // @param loginDto 로그인 정보 DTO
    // @returns 생성된 토큰 객체
    // @throws {NotFoundException} 존재하지 않는 사용자일 경우 예외 발생
    async login(loginDto: LoginDto): Promise<Token> {
        const user = await this.userService.findOneUserByEmail(loginDto.email);
        if (!user || user == null) {
            throw new NotFoundException('존재하지 않는 사용자입니다.');
        }
        return await this.createToken(user);
    }

    // ## JWT 토큰 생성
    // @param user 사용자 엔티티
    // @returns 생성된 토큰 객체 (액세스 토큰 및 리프레시 토큰)
    // @throws {Error} 토큰 생성 실패 시 예외 발생
    async createToken(user: User): Promise<Token> {
        const payload: Payload = {
            id: user.id,
            email: user.email,
            password: user.passwd,
        };

        const accessToken = await this.jwtService.signAsync(payload);
        const refreshToken = await this.jwtService.signAsync(payload, {   
            jwtid: accessToken,
            expiresIn: 604800 
        });
        
        return {
            accessToken,
            refreshToken
        };
    }
}