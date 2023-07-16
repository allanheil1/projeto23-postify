import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { PublicationsModule } from './publication/publication.module';
import { AuthModule } from './authentication/auth.module';
import { AuthController } from './authentication/auth.controller';

@Module({
  imports: [UserModule, PublicationsModule, AuthModule, PrismaModule],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
