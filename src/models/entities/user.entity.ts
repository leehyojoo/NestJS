/*
user.entity.ts
  - @Entity() 데코레이터를 사용하여 이 클래스가 데이터베이스 테이블과 매핑됨을 나타냄
  - @PrimaryGeneratedColumn() 데코레이터는 id 필드가 기본 키임을 나타내며, 자동으로 증가하는 숫자임
  - @Column() 데코레이터는 각 필드가 데이터베이스의 열임을 나타냄
  - @CreateDateColumn()과 @UpdateDateColumn()은 각각 생성일과 수정일을 자동으로 관리함
*/

import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    passwd: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}