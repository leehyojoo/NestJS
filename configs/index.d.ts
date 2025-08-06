/*
index.d.ts
  - NestJS 애플리케이션의 설정을 정의하는 타입스크립트 파일
  - Config 타입은 데이터베이스 연결 옵션을 포함하는 객체를 정의
  - MysqlConnectionOptions는 TypeORM에서 MySQL 데이터베이스 연결을 위한 옵션을 정의하는 인터페이스

  - AuthConfig 인터페이스는 JWT 인증 설정을 정의
  - JwtModuleAsyncOptions와 JwtModuleOptions는 NestJS JWT 모듈의 비동기 및 동기 설정 옵션을 정의
*/

import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions.js"
import { JwtModuleAsyncOptions, JwtModuleOptions } from "@nestjs/jwt";

export type Config = {
    db: MysqlConnectionOptions
}

export interface AuthConfig {
    jwt: {
        secret: string
        signOptions?: {
            expiresIn?: number;
        }
    }
}