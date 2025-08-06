/*
index.d.ts
  - NestJS 애플리케이션의 설정을 정의하는 타입스크립트 파일
  - Config 타입은 데이터베이스 연결 옵션을 포함하는 객체를 정의
  - MysqlConnectionOptions는 TypeORM에서 MySQL 데이터베이스 연결을 위한 옵션을 정의하는 인터페이스
*/

import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions.js"

export type Config = {
    db: MysqlConnectionOptions
}