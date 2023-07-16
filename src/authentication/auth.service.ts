import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login-dto';
import { AuthNewUserDTO } from './dto/auth-newuser-dto';
import { UserService } from 'src/user/user.service';
import { UsersRepository } from 'src/user/repository/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    private ISSUER = 'allan';
    private AUDIENCE = 'users'

    constructor(
        private readonly usersService: UserService,
        private readonly usersRepository: UsersRepository,
        private readonly jwTService: JwtService,
    ) {}

    async signup(body: AuthNewUserDTO) {
        const newUser = await this.usersService.createUser(body)
        return this.createToken(newUser);
    }

    async signin(body: AuthLoginDTO) {
        const user = await this.usersRepository.getUserByEmail(body.email);
        if(!user) throw new UnauthorizedException('Invalid Credentials')

        const passwordIsValid = bcrypt.compareSync(body.password, user.password);
        if(!passwordIsValid) throw new UnauthorizedException('Invalid Credentials');

        return this.createToken(user);
    }

    createToken(user: { id: number; name: string; email: string; avatar: string; createdAt: Date; }) {
        const token = this.jwTService.sign(
            {
                name: user.name,
                email: user.email,
            }, 
            {
                expiresIn: '7 days',
                subject: String(user.id),
                issuer: this.ISSUER,
                audience: this.AUDIENCE,
            }
        );
        return { token };
    }

    checkToken(token: string) {
        try {
            const data = this.jwTService.verify(token, {
                issuer: this.ISSUER,
                audience: this.AUDIENCE,
            });

            return data;
        } catch (e) {
            console.log(e);
            throw new BadRequestException(e)
        }
    }
}
