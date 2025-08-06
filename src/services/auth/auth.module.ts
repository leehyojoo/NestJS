/*
// src/services/auth/auth.module.ts
    * 사용자 인증 모듈 정의
    * 이 모듈은 사용자 인증 관련 서비스와 컨트롤러를 포함
    * JWT 토큰 생성 및 사용자 인증 기능을 제공
    * 사용자 서비스와 JWT 모듈을 임포트하여 의존성 주입
*/

import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { AuthController } from "src/controllers/auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthConfig } from "configs/index.d";

// ## 인증 모듈
// 이 모듈은 사용자 인증 관련 서비스와 컨트롤러를 포함합니다.
// JWT 토큰 생성 및 사용자 인증 기능을 제공하며, 사용자 서비스와 JWT 모듈을 임포트하여 의존성 주입을 수행합니다.

@Module({
    imports: [
        UserModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const authConfig = configService.get<AuthConfig>('auth');
                if (!authConfig || !authConfig.jwt) {
                    throw new Error('JWT 환경변수 미설정');
                }
                return authConfig.jwt;
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule{}