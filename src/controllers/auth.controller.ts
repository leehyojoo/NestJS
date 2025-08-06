/*
// src/controllers/auth.controller.ts
    * 사용자 인증 관련 컨트롤러
    * 로그인, 토큰 생성 등의 인증 관련 엔드포인트를 정의
*/

import { Body, Controller, Post } from "@nestjs/common";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { AuthService } from "src/services/auth/auth.service";
import { LoginDto } from "src/models/dto/login.dto";
import { Token } from "src/auth/token";


@Controller('auth')
export class AuthController {
    // 인증 관련 엔드포인트를 정의하는 컨트롤러
    // 이 컨트롤러는 사용자 인증, 로그인, 토큰 생성 등을 처리

    constructor(private readonly authService: AuthService) {}

    // ## 사용자 로그인 엔드포인트
    // @param loginDto 로그인 정보 DTO
    // @returns 생성된 토큰 객체
    // @throws {NotFoundException} 존재하지 않는 사용자일 경우 예외 발생
    // 이 엔드포인트는 사용자가 로그인할 때 호출되며, 로그인 정보를 기반으로 토큰을 생성

    @ApiOperation({ description: '로그인' })
    @Post('login')
    @ApiOkResponse({ description: '로그인 성공 시 토큰 값', type: Token })
    async login(@Body() loginDto: LoginDto): Promise<Token> {
       return await this.authService.login(loginDto);
    }
    
}