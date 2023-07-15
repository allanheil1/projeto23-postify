import { MinLength, MaxLength, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDTO {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    password: string;
}