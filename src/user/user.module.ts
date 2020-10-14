import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { User } from '../user/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [
        UserController,],
    providers: [
        UserService,],
})
export class UserModule { }
