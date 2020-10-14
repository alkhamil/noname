import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Repository } from 'typeorm';
import { Role, RolePagination, RolePaginationDto } from './role.entity';

@Injectable()
export class RoleService { 
    constructor(@InjectRepository(Role) private roleEntity: Repository<Role>) {}

    async getAllRole(rolePagination: RolePagination): Promise<RolePaginationDto> {
        const skippedItems = (rolePagination.page - 1) * rolePagination.limit;

        const totalRow = await this.roleEntity.count()
        const roles = await this.roleEntity.createQueryBuilder()
            .orderBy('id', 'DESC')
            .offset(skippedItems)
            .limit(rolePagination.limit)
            .getMany()

        return {
            totalRow,
            page: rolePagination.page,
            limit: rolePagination.limit,
            data: roles,
        }
    }
}
