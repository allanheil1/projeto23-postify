import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserController } from './user/user.controller';

@Module({
  imports: [UserModule, PrismaModule],
  controllers: [UserController],
  providers: [],
})
export class AppModule {}
