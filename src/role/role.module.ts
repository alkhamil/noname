import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { RoleController } from './role.controller';
import { Role } from './role.entity';
import { RoleService } from './role.service';

@Module({
    imports: [TypeOrmModule.forFeature([Role])],
    controllers: [RoleController],
    providers: [RoleService],
})
export class RoleModule { }
