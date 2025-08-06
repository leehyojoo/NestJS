/*
mysql.service.ts
    - MySQL 데이터베이스 연결을 위한 서비스 클래스
    - TypeOrmOptionsFactory 인터페이스를 구현하여 TypeORM 설정을 제공
    - ConfigService를 사용하여 환경 설정에서 MySQL 연결 옵션을 가져옴
    - createTypeOrmOptions() 메서드는 TypeORM 모듈에 필요한 MySQL 연결 옵션을 반환
    - 반환되는 옵션은 TypeOrmModuleOptions 타입으로, MySQL 데이터베이스 연결에 필요한 설정을 포함
    - autoLoadEntities 옵션을 true로 설정하여 엔티티를 자동으로 로드

    1. config 관련 코드를 통해 실행 환경에 맞는 *.yml 파일을 로드 (ConfigModule 설정)
    2. NestJS의 메인 모듈(app.module.ts 등)에서 TypeOrmModule을 설정할 때, forRootAsync 라는 비동기 방식을 사용
    3. forRootAsync 설정 안에 useClass: MysqlService 와 같이 이 서비스를 지정
    4. 애플리케이션이 시작되면, NestJS는 TypeOrmModule을 초기화하기 위해 MysqlService의 인스턴스를 생성
    5. 이때 MysqlService의 createTypeOrmOptions() 메소드를 호출
    6. 이 메소드는 ConfigService를 통해 db 설정을 가져와 TypeORM이 요구하는 최종 설정 객체를 만들어 반환
    7. TypeOrmModule은 반환된 이 설정 객체를 사용하여 데이터베이스에 연결
*/

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

// MySQL 연결 옵션을 가져오기 위한 서비스
// @Injectable 데코레이터를 사용하여 NestJS에 서비스임을 알림
@Injectable()
export class MysqlService implements TypeOrmOptionsFactory  {
    constructor(private configService: ConfigService) {}

    // TypeOrmOptionsFactory 인터페이스의 메서드 구현
    // createTypeOrmOptions() 메서드는 TypeORM 모듈에 필요한 MySQL 연결 옵션을 반환
    // ConfigService를 사용하여 환경 설정에서 MySQL 연결 옵션을 가져옴
    // 반환되는 옵션은 TypeOrmModuleOptions 타입으로, MySQL 데이터베이스 연결에 필요한 설정을 포함
    createTypeOrmOptions(): TypeOrmModuleOptions {
        const mysqlConfigOptions = this.configService.get('db');
        return {
            ...mysqlConfigOptions,
            autoLoadEntities: true,
        }
    }
}   