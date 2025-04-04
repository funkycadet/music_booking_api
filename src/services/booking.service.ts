import { db } from "../database";
import { NotFoundError } from "../exceptions";
import { IBookingCreate, IBooking, Pageable, Page } from "../interfaces";
import { pageableHandler } from "../utils";
import { Prisma } from "@prisma/client";

export default class BookingService {
  public async getAllBookings(query: Pageable<Prisma.BookingWhereInput>): Promise<Page<IBooking>> {
    const pageableQuery = pageableHandler.process<Prisma.BookingWhereInput>(query);

    const [count, data] = await Promise.all([
      db.booking.count({ where: pageableQuery.filter }),
      db.booking.findMany({
        skip: pageableQuery.skip,
        take: pageableQuery.limit,
        where: pageableQuery.filter,
        orderBy: pageableQuery.orderBy || { createdAt: 'desc' },
      }),
    ]);

    return pageableHandler.responseToPageable(pageableQuery, count, data);
  }

  public async getBooking(filter: Partial<Prisma.BookingWhereInput>): Promise<IBooking> {
    const booking = await db.booking.findFirst({
      where: {
        ...filter,
      },
    });

    if (!booking) {
      throw new NotFoundError("Booking not found!");
    }

    return booking;
  }

  public async getBookingById(id: string): Promise<IBooking> {
    const booking = await db.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      throw new NotFoundError("Booking not found!");
    }

    return booking;
  }

  public async createBooking(data: IBookingCreate): Promise<IBooking> {
    const findEvent = await db.event.findUnique({ where: { id: data.eventId } });
    if (!findEvent) {
      throw new NotFoundError("Event not found!");
    }
    const booking = await db.booking.create({
      data
    });

    return booking;
  }

  public async updateBooking(id: string, data: Partial<IBookingCreate>): Promise<IBooking> {
    const booking = await db.booking.update({
      where: { id },
      data
    });

    return booking;
  }

  public async deleteBooking(id: string): Promise<IBooking> {
    const booking = await db.booking.delete({
      where: { id },
    });

    return booking;
  }
}

