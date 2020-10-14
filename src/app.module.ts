import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule { }
