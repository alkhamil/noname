import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('m_role')
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column()
    description: string;

}

export class RolePagination {
    page: number
    limit: number
}

export class RolePaginationDto {
    data: Role[]
    page: number
    limit: number
    totalRow: number
}