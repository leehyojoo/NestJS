/*
create-user.dto.ts
    사용자 생성 DTO (Data Transfer Object)
    사용자 생성 시 필요한 데이터 구조를 정의

PickType을 사용하여 User 엔티티에서 필요한 필드만 선택
PickType은 Swagger 문서화에도 사용되어, API 문서에서 사용자 생성 시 필요한 필드만 노출
*/

import {PickType} from "@nestjs/swagger";
import { User } from "src/models/entities/user.entity";    

export class CreateUserDto extends PickType(User, [
    'name',
    'email',
    'passwd',
]){}