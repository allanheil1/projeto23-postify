import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { NewUserDTO } from './dto/new-user.dto';
import { LoginDTO } from './dto/login-dto';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('user')
    createUser(@Body() body: NewUserDTO) {
        return this.userService.createUser(body);
    }

    @Post('signin')
    signinUser(@Body() body: LoginDTO) {
        return this.userService.login(body);
    }

}
