/* 
app.controller.ts
 사용자의 요청을 처리하는 컨트롤러 클래스
  - @Controller() 데코레이터를 사용하여 NestJS에 컨트롤러임을 알림, 라우터 정의 가능
  - @Get() 데코레이터를 사용하여 HTTP GET 요청을 처리하는 메서드 정의
  - getHello() 메서드는 AppService의 getHello() 메서드를 호출하여 응답 문자열을 반환
  - AppService는 의존성 주입을 통해 생성자에서 주입됨
*/

import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api') // -> 'api' 경로로 요청을 처리
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/gethello') // -> '/api/gethello' 경로로 GET 요청을 처리
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  postHello(): string {
    return this.appService.getHello();
  }
}
