/*
    src/auth/payload.ts
    * 사용자 인증에 필요한 페이로드 정의
    * JWT 토큰 생성 시 사용자 정보를 담는 객체 구조를 정의
    * 사용자 ID, 이메일, 비밀번호 필드를 포함
*/

export class Payload {
    id: number;  
    email: string;
    password: string;
}