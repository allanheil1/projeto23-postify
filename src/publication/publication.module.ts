import { Module } from '@nestjs/common';
import { PrismaPublicationRepository } from './repository/implementations/prisma.publication.repository';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/authentication/auth.service';
import { PublicationsService } from './publication.service';
import { PublicationsController } from './publication.controller';
import { PublicationRepository } from './repository/publication.repository';
import { UserService } from 'src/user/user.service';
import { UsersRepository } from 'src/user/repository/user.repository';
import { PrismaUserRepository } from 'src/user/repository/implementations/prisma.user.repository';

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
        }),
    ],
    controllers: [PublicationsController],
    providers: [PublicationsService,
        AuthService,
        UserService,
        {
            provide: PublicationRepository,
            useClass: PrismaPublicationRepository,
        },
        {
            provide: UsersRepository,
            useClass: PrismaUserRepository,
        }
    ],
    exports: [
        PublicationsService,
        {
            provide: PublicationRepository,
            useClass: PrismaPublicationRepository,
        }
    ]
})
export class PublicationsModule { }
