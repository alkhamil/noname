import { Body, Res, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { RolePagination, RolePaginationDto } from './role.entity';
import { RoleService } from './role.service';

@ApiTags('Role')
@Controller('api/role')
export class RoleController {
    constructor(private roleService: RoleService) {}

    @Get('/')
    @ApiQuery({name: 'page'})
    @ApiQuery({name: 'limit'})
    @ApiOkResponse({description: 'Success Get Data'})
    @ApiBadRequestResponse({ description: 'Error'})
    @ApiUnauthorizedResponse({description: 'Unauthorized'})
    async getAllUser(@Res() res, @Query() rolePagination: RolePagination): Promise<RolePaginationDto> {
        rolePagination.page = Number(rolePagination.page);
        rolePagination.limit = Number(rolePagination.limit);
        const role = await this.roleService.getAllRole({
            ...rolePagination,
            limit: rolePagination.limit > 10 ? 10 : rolePagination.limit
        });

        return res.status(HttpStatus.OK).json(role);
        
    }

    @Get('/:id')
    async getUserId(){
        return 'hello';
    }
}
