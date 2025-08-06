/*
mysql.module.ts

@Module 이라는 이름의 decorator가 생성되는 클래스
    - providers -> 모듈 안에서 정의된 서비스와 같은 집합 부문
    - exports -> 앱 서비스가 다른 모듈에서도 사용될 때, providers의 수출
    - MysqlService를 providers에 등록하여 NestJS가 이 서비스를 인식하고 사용할 수 있도록 함
    - MysqlService를 exports에 등록하여 다른 모듈에서도 이 서비스를 사용할 수 있도록 함

이 모듈은 MySQL 데이터베이스 연결을 설정하고 관리하는 데 사용
MySQL 연결 옵션을 제공하는 MysqlService를 정의하고, 이 서비스를 다른 모듈에서 사용할 수 있도록 exports에 포함시킴         

*/

import { Module } from "@nestjs/common";
import { MysqlService } from "./mysql.service";

@Module({
    providers: [MysqlService],
    exports: [MysqlService],
})
export class MysqlModule {}