import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    UserModule,
    RoleModule,
        TypeOrmModule.forRoot()
      ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
