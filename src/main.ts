/* 
main.ts

(1) NestFactory.create(AppModule)
	NestFactory.create Method를 통해서 새로운 Nest application을 생성함
	AppModule은 프로젝트의 Root Module 
	
(2) bootstrap() 함수는 부팅 함수
	지금은 몇 번 포트를 통해서 서버를 구동할지에 대해서 정의되어 있지만 서버 구동에 대한 여러가지 설정 가능
	listen() Method의 Return 값이 Promise 형이기 때문에 bootstrap 함수는 기본적으로 async 비동기 함수로 생성
*/

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
