import Joi from 'joi';

export const createEventSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  eventDate: Joi.date().iso().required(),
  location: Joi.string().required(),
});

export const updateEventSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  eventDate: Joi.date().iso(),
  location: Joi.string(),
}).or('title', 'description', 'eventDate', 'location');

