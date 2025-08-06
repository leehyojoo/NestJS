/* 
app.module.ts

@Module 이라는 이름의 decorator가 생성되는 클래스
	- imports
	- controllers -> 모듈 안에서 정의된 컨트롤러의 집합 부문
	- providers -> 모듈 안에서 정의된 서비스와 같은 집합 부문
	- exports -> 앱 서비스가 다른 모듈에서도 사용될 때, providers의 수출
*/

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from 'configs/configuration';
import { MysqlService } from 'configs/mysql/mysql.service';
import { UserModule } from './services/user/user.module';
import { AuthModule } from './services/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useClass: MysqlService,
   }),
     // 사용자 모듈을 임포트하여 사용자 관련 기능을 포함
     UserModule,
    // 인증 모듈을 임포트하여 사용자 인증 관련 기능을 포함
    // AuthModule은 사용자 인증 서비스와 컨트롤러를 포함
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
