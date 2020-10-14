import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User, UserPagination, UserPaginationDto } from './user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userEntity: Repository<User>) {}

    async getAllUser(userPagination: UserPagination): Promise<UserPaginationDto> {
        const skippedItems = (userPagination.page - 1) * userPagination.limit;

        const totalRow = await this.userEntity.count()
        const users = await this.userEntity.createQueryBuilder()
            .orderBy('id', 'DESC')
            .offset(skippedItems)
            .limit(userPagination.limit)
            .getMany()

        return {
            totalRow,
            page: userPagination.page,
            limit: userPagination.limit,
            data: users,
        }
    }

    async getById(id: number) : Promise<any> {
        return await this.userEntity.findOne(id);
    }

    async updateUser(id: number, user: User): Promise<UpdateResult> {
        return await this.userEntity.update(id, user);
    }

    async deleteUser(id): Promise<DeleteResult> {
        return await this.userEntity.delete(id);
    }

    async createUser(user: User): Promise<User> {
        return await this.userEntity.save(
            this.userEntity.create(user)
        )
    }
}
