import { Prisma } from "@prisma/client";

export interface IBookingCreate {
  eventId: string;
  userId: string;
  // ticketType: string;
  // quantity: number;
  bookingDate: Date;
  paymentDetails: {}
}

export type IBooking = Prisma.$BookingPayload['scalars'];

