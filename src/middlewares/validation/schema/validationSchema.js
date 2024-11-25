import Joi from "joi";

export const validateSignUp = Joi.object({
  nickname: Joi.string().min(3).max(30).required().messages({
    "string.min": "Никнейм должен быть не менее 3 символов.",
    "string.max": "Никнейм не может превышать 30 символов.",
    "any.required": "Никнейм обязателен.",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Введите корректный email.",
    "any.required": "Email обязателен.",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Пароль должен быть не менее 6 символов.",
    "any.required": "Пароль обязателен.",
  }),
  isVerify: Joi.boolean().optional(),
});

export const validateSignIn = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Введите корректный email.",
    "any.required": "Email обязателен.",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Пароль должен быть не менее 6 символов.",
    "any.required": "Пароль обязателен.",
  }),
});

export const validateToken = Joi.object({
  refreshToken: Joi.string().required().messages({
    "any.required": "Токен обязателен.",
    "string.base": "Токен должен быть строкой.",
  }),
});
