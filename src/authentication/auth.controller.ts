import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login-dto';
import { AuthService } from './auth.service';
import { AuthNewUserDTO } from './dto/auth-newuser-dto';
import { users } from '@prisma/client';
import { AuthGuard } from './authguard/auth.guard';
import { UserRequest } from './decorators/user.decorators';

@Controller('')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('user')
    async signup(@Body() body: AuthNewUserDTO) {
        return this.authService.signup(body);
    }

    @HttpCode(200)
    @Post('signin')
    async signin(@Body() body: AuthLoginDTO) {
        return this.authService.signin(body);
    }

    @UseGuards(AuthGuard)
    @Get('auth/me')
    async userLogged(@UserRequest() user: users) {
        return user;
    }
}
