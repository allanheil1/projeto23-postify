import { users } from '@prisma/client';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/authentication/authguard/auth.guard';
import { UserRequest } from 'src/authentication/decorators/user.decorators';
import { PublicationsService } from './publication.service';
import { NewPublicationDTO } from './dto/new-publication.dto';

@Controller('publication')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @UseGuards(AuthGuard)
  @Post()
  newPublication(@Body() body: NewPublicationDTO, @UserRequest() user: users) {
    const userId = user.id;
    return this.publicationsService.newPublication(body, userId);
  }

  @UseGuards(AuthGuard)
  @Get()
  getAllUserPublications(@UserRequest() user: users) {
    const userId = user.id;
    return this.publicationsService.getAllUserPublications(userId);
  }
}
