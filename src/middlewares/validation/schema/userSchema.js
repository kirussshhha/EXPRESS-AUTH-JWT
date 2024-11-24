import Joi from "joi";

const orderSchema = Joi.object({
  nickname: Joi.string().min(3).max(30).messages({
    "string.base": `"nickname" должно быть строкой`,
    "string.empty": `"nickname" не может быть пустым`,
    "string.min": `"nickname" должно содержать минимум 3 символа`,
    "string.max": `"nickname" должно содержать максимум 30 символов`,
  }),
  password: Joi.string().min(8).max(30).messages({
    "string.base": `"password" должно быть строкой`,
    "string.empty": `"password" не может быть пустым`,
    "string.min": `"password" должно содержать минимум 8 символа`,
    "string.max": `"password" должно содержать максимум 30 символов`,
  }),
  email: Joi.string().email(),
  isVerify: Joi.boolean(),
});

export default orderSchema;
