/*
    * login.dto.ts
    * 사용자 로그인 DTO (Data Transfer Object)
    * 사용자 로그인 시 필요한 데이터 구조를 정의
    * PickType을 사용하여 User 엔티티에서 이메일과 비밀번호 필드만 선택
*/

import { PickType } from "@nestjs/swagger";
import { User } from "src/models/entities/user.entity";

export class LoginDto extends PickType(User, [
    'email',
    'passwd',
]) {}