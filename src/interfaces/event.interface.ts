import { Prisma } from "@prisma/client";

export interface IEventCreate {
  title: string;
  description: string;
  location: string;
  eventDate: Date;
  artistId: string;
}

export interface IEventUpdate {
  title?: string;
  description?: string;
  location?: string;
  eventDate?: Date;
}

export type IEvent = Omit<Prisma.$EventPayload['scalars'], ''>;

