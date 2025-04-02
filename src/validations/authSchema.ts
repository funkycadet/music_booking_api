import Joi from 'joi';

const gender = ['male', 'female'];

export const signupSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  emailAddress: Joi.string().email().required(),
  password: Joi.string().required().min(8),
  gender: Joi.string()
    .valid(...gender)
    .required(),
  // role: Joi.string().valid("user", "admin").required(),
});

export const artistSignupSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  emailAddress: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  gender: Joi.string().valid(...gender).required(),
  profile: Joi.object({
    artistName: Joi.string().optional(),
    bio: Joi.string().optional(),
    profilePicture: Joi.string().uri().optional(),
    genres: Joi.array().items(Joi.string()).optional(),
    socialLinks: Joi.object().unknown(true).optional(),
  }).optional(),
});

export const loginSchema = Joi.object({
  emailAddress: Joi.string().required(),
  password: Joi.string().required(),
});
