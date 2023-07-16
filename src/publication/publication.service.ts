import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PublicationRepository } from './repository/publication.repository';
import { NewPublicationDTO } from './dto/new-publication.dto';

@Injectable()
export class PublicationsService {

    constructor(private readonly publicationsRepository: PublicationRepository) { }

    async newPublication(body: NewPublicationDTO, userId: number) {
        const publication = await this.publicationsRepository.getPublicationByTitle(body.title);
        if (publication && publication.userId === userId) throw new HttpException('This publication already exists', HttpStatus.CONFLICT);

        return this.publicationsRepository.newPublication(body, userId)
    }

    async getAllUserPublications(userId: number) {
        const publications = await this.publicationsRepository.getAllUserPublications(userId);
        return publications;
    }
}
