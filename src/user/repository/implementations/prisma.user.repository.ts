import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UsersRepository } from "../user.repository";
import { NewUserDTO } from "src/user/dto/new-user.dto";

@Injectable()
export class PrismaUserRepository implements UsersRepository {
    constructor(private readonly prisma: PrismaService) { }

    async createUser(data: NewUserDTO) {
        return await this.prisma.users.create({
            data: data
        });
    }

    async getUserById(id: number) {
        return await this.prisma.users.findUnique({
            where: { id }
        });
    }

    async getUserByEmail(email: string) {
        return await this.prisma.users.findUnique({
            where: { email }
        });
    }
}