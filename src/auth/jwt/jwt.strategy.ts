/*
// jwt.strategy.ts
 * JWT 전략 정의
 * Passport.js를 사용하여 JWT 토큰을 검증하고 사용자 정보를 추출하는 전략을 구현
 * 이 전략은 인증 미들웨어로 사용되어 보호된 라우트에 접근할 때 JWT 토큰을 검증
*/

import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Payload } from "../payload";
import { ConfigService } from "@nestjs/config";
import { AuthConfig } from "configs";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<AuthConfig>('auth')?.jwt.secret,
        });
    }
    async validate(payload: Payload) {
        return { id: payload.id, email: payload.email };
    }
}  