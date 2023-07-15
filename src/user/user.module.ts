import { Module } from '@nestjs/common';
import { UsersRepository } from './repository/user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaUserRepository } from './repository/implementations/prisma.user.repository';

@Module({
    
    controllers: [UserController],
    providers: [
        UserService,
        {
            provide: UsersRepository,
            useClass: PrismaUserRepository,
        },
    ],
    exports: [
        UserService,
        {
            provide: UsersRepository,
            useClass: PrismaUserRepository,
        },
    ],
})

export class UserModule {}
