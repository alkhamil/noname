import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsPhoneNumber } from "class-validator";
import { BaseEntity, BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcrypt";

@Entity('m_user')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty()
    @Column({nullable: false})
    role_id: number;

    @ApiProperty()
    @Column({type: "bigint"})
    @IsPhoneNumber('ID')
    phone: number;

    @ApiProperty()
    @Column()
    username: string;

    @ApiProperty()
    @Column()
    @IsEmail()
    email: string
    
    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10)
    }

    @ApiProperty()
    @Column({nullable: true})
    password: string;

}

export class UserPagination {
    page: number
    limit: number
}

export class UserPaginationDto {
    data: User[]
    page: number
    limit: number
    totalRow: number
}