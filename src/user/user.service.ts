import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { NewUserDTO } from './dto/new-user.dto';
import { UsersRepository } from './repository/user.repository';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dto/login-dto';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UsersRepository) { }

  async createUser(body: NewUserDTO) {

    const user = await this.usersRepository.getUserByEmail(body.email);

    if (user) throw new ConflictException('User is already registered');

    const hashedPassword = bcrypt.hashSync(body.password, 12);

    const newUser = await this.usersRepository.createUser({
      ...body,
      password: hashedPassword,
    })

    const returnUserObject = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      avatar: newUser.avatar,
      createdAt: newUser.createdAt
    }

    return returnUserObject;
  }

  async getUserById(id: number) {

    const user = await this.usersRepository.getUserById(id);
    if (!user) throw new NotFoundException('User cannot be found');
    return user;

  }

  async login(body: LoginDTO) {

    const user = await this.usersRepository.getUserByEmail(body.email);
    if (!user) throw new UnauthorizedException('Invalid credentials')

    const passwordIsValid = bcrypt.compareSync(body.password, user.password);
    if (!passwordIsValid) throw new UnauthorizedException('Invalid credentials')
    
  }

}
