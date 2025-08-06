/*
app.service.ts
  - @Injectable() 데코레이터를 사용하여 NestJS에 서비스임을 알림
  - getHello() 메서드는 'Hello World!' 문자열을 반환
  - 이 서비스는 의존성 주입을 통해 다른 클래스에서 사용될 수 있음

사용자의 요청이 들어오면 Controller가 해당 요청을 처리하고, 필요한 경우 AppService를 호출하여 비즈니스 로직을 수행함
*/

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
