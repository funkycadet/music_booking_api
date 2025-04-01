import { db } from "../database";
import { NotFoundError } from "../exceptions";
import { IEvent, IEventCreate, IEventUpdate, Pageable, Page } from "../interfaces";
import { pageableHandler } from "../utils";
import { Prisma } from "@prisma/client";

export default class EventService {
  public async getAllEvents(query: Pageable<Prisma.EventWhereInput>): Promise<Page<IEvent>> {
    const pageableQuery = pageableHandler.process<Prisma.EventWhereInput>(query);

    const [count, data] = await Promise.all([
      db.event.count({ where: pageableQuery.filter }),
      db.event.findMany({
        skip: pageableQuery.skip,
        take: pageableQuery.limit,
        where: pageableQuery.filter,
        orderBy: pageableQuery.orderBy || { createdAt: 'desc' },
      }),
    ]);

    return pageableHandler.responseToPageable(pageableQuery, count, data);
  }

  public async getEvent(filter: Partial<IEvent>): Promise<IEvent> {
    const event = await db.event.findFirst({
      where: {
        ...filter,
      },
    });

    if (!event) {
      throw new NotFoundError("Event not found!");
    }

    return event;
  }

  public async getEventById(id: string): Promise<IEvent> {
    const event = await db.event.findUnique({
      where: { id },
    });

    if (!event) {
      throw new NotFoundError("Event not found!");
    }

    return event;
  }

  public async createEvent(data: IEventCreate): Promise<IEvent> {
    const event = await db.event.create({
      data
    });

    return event;
  }

  public async updateEvent(id: string, data: IEventUpdate): Promise<IEvent> {
    const event = await db.event.update({
      where: { id },
      data: {
        ...data,
      },
    });

    return event;
  }

  public async deleteEvent(id: string): Promise<IEvent> {
    const event = await db.event.delete({
      where: { id },
    });

    return event;
  }
}

