import { users } from "@prisma/client";
import { NewUserDTO } from "../dto/new-user.dto";

export abstract class UsersRepository {

    abstract createUser(data: NewUserDTO): Promise<users>;

    abstract getUserByEmail(email: string): Promise<users>;

    abstract getUserById(id: number): Promise<users>;

}