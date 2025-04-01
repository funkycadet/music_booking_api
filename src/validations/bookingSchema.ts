import Joi from "joi";

export const createBookingSchema = Joi.object({
  eventId: Joi.string().required(),
  paymentDetails: Joi.object().unknown(true),
  // userId: Joi.string().required(),
  // ticketType: Joi.string().valid('VIP', 'Regular').required(),
  // numberOfTickets: Joi.number().integer().min(1).required(),
});

export const updateBookingSchema = Joi.object({
  status: Joi.string().valid("confirmed", "cancelled").required(),
});

