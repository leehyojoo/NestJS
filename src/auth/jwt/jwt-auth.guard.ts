/*
// src/auth/jwt/jwt-auth.guard.ts
JWT가 유효하지 않거나, token은 있지만 사용자 정보가 없는 경우에 대한 예외 처리를 포함한 JWT 인증 가드

 * JWT 인증 가드
 * Passport.js의 AuthGuard를 확장하여 JWT 토큰을 검증하고 사용자 정보를 추출하는 가드
 * 이 가드는 보호된 라우트에 접근할 때 JWT 토큰을 검증
*/

import {
  BadRequestException,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { Not } from 'typeorm';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { Token } from '../token';
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // JwtAuthGuard는 Passport의 AuthGuard를 확장하여 JWT 인증을 처리
  constructor() {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any): any {
    // err가 있으면 예외를 발생시킴
    // info가 Error 인스턴스이면 에러 메시지를 반환함
    // user가 없으면 NotFoundException을 발생시킴

    if (err) throw err;

    if (info instanceof Error) {
      const message = this.getTokenErrorMessage(info);
      throw message;
    }

    // 사용자 정보가 없으면 NotFoundException을 발생시킴
    if (!user) {
      throw new NotFoundException('해당 사용자가 존재하지 않습니다.');
    }

    return user;
  }

  private getTokenErrorMessage(error: Error) {
    if (error instanceof TokenExpiredError) {
      return new UnauthorizedException('만료된 토큰입니다.');
    }

    if (error instanceof JsonWebTokenError) {
      return new UnauthorizedException('유효하지 않은 토큰입니다.');
    }

    if (error.message === 'No auth token') {
      return new UnauthorizedException('토큰이 없습니다.');
    }

    return new BadRequestException(error.message);
  }
}
