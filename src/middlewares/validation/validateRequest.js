const validateRequest = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      message: "Ошибка валидации query параметров",
      details: error.details.map((err) => err.message),
    });
  }
  req.body = value;
  next();
};

export default validateRequest;
