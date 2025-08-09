/*
// src/models/entities/board.entity.ts
    * 게시판 엔티티 정의
    * 게시판의 제목, 설명, 작성일, 수정일 등의 필드를 포함
    * 사용자와의 관계를 설정하여 게시판이 특정 사용자에 속함을 나타냄
*/

import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { ApiOperation } from "@nestjs/swagger";

@Entity()
export class Board {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;

    // ## 사용자와의 관계 설정
    // @ManyToOne 데코레이터를 사용하여 Board 엔티티와 User 엔티티 간의 다대일 관계를 설정
    // 이 관계는 게시판이 특정 사용자에 속함을 나타냄
    // @JoinColumn 데코레이터는 외래 키 열을 지정하며, 여기서는 'user_id'로 설정
    // 이 설정은 Board 엔티티가 User 엔티티와 연결되어 있음을 나타냄
    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' }) // 외래 키
    user: User;
}


