import { publications } from "@prisma/client";
import { NewPublicationDTO } from "../dto/new-publication.dto";

export abstract class PublicationRepository {
    abstract newPublication(data: NewPublicationDTO, userId: number): Promise<publications>;
    abstract getAllUserPublications(id: number): Promise<publications[]>;
    abstract getPublicationByTitle(title: string): Promise<publications>;
    
}