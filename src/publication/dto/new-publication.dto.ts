import { IsString, IsNotEmpty, IsDateString, Matches } from "class-validator";

export class NewPublicationDTO {
    @IsString()
    @IsNotEmpty()
    image: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    text: string;

    @IsNotEmpty()
    @IsDateString()
    @Matches(/^\d{4}-\d{2}-\d{2}$/)
    dateToPublish: string;

    published: boolean = false;

    @IsString()
    @IsNotEmpty()
    socialMedia: string;
}