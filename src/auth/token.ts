/*
 /src/auth/token.ts
 * JWT 토큰 생성 및 검증을 위한 서비스
 * 이 서비스는 JWT 토큰을 생성하고, 유효성을 검증하는 기능을 제공
*/

export class Token {
    accessToken: string; // Authorization bearer token
    refreshToken: string;
}