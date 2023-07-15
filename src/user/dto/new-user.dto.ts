import { MinLength, MaxLength, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class NewUserDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    password: string;

    @IsString()
    @IsNotEmpty()
    avatar: string;
}