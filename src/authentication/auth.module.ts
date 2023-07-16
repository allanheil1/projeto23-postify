import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { UsersRepository } from 'src/user/repository/user.repository';
import { PrismaUserRepository } from 'src/user/repository/implementations/prisma.user.repository';
import { AuthService } from './auth.service';

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
        }),
        PrismaModule,
        UserModule,
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        UserService,
        {
            provide: UsersRepository,
            useClass: PrismaUserRepository,
        }
    ],
    exports: [AuthService]
})
export class AuthModule { }
