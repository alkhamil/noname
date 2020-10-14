import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiOkResponse, ApiParam, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { User, UserPagination, UserPaginationDto } from './user.entity';
import { UserService } from './user.service';

@Controller('api/user')
@ApiTags('User')
export class UserController {
    constructor(
        private userService: UserService
    ) {}

    @Get('/')
    @ApiQuery({name: 'page'})
    @ApiQuery({name: 'limit'})
    @ApiOkResponse({description: 'Success Get Data'})
    @ApiBadRequestResponse({ description: 'Error'})
    @ApiUnauthorizedResponse({description: 'Unauthorized'})
    async getAllUser(@Query() userPagination: UserPagination): Promise<UserPaginationDto> {
        userPagination.page = Number(userPagination.page);
        userPagination.limit = Number(userPagination.limit);
        return await this.userService.getAllUser({
            ...userPagination,
            limit: userPagination.limit > 10 ? 10 : userPagination.limit
        });
        
    }

    @Get('/:id')
    @ApiParam({name: 'id'})
    async getId(@Param('id') id) : Promise<any> {
        const result = await this.userService.getById(id);
        if (result) {
            return {
                message: 'Success get data',
                status: HttpStatus.OK,
                data: result
            };
        }else {
            return {
                message : 'No data found!',
                status: HttpStatus.NOT_FOUND
            }
        }
    }


    @Put('/:id/update')
    @ApiParam({name: 'id'})
    @ApiBody({type: User})
    async updateUser(@Param('id') id, @Body() user: User) {
        return await this.userService.updateUser(id, user)
    }

    @Delete('/:id/delete')
    @ApiParam({name:'id'})
    async deleteUser(@Param('id') id) {
        return await this.userService.deleteUser(id);
    }

    @Post('/')
    @ApiBody({type: User})
    async createUser(@Body() user: User) {
        return await this.userService.createUser(user);
    }
}
