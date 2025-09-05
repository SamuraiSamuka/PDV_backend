export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        succes: false,
        message: "Erro de validação nos dados enviados.",
        errors: error.details.map((err) => ({
          campo: err.context.key,
          mensagem: err.message,
        })),
      });
    }

    next();
  };
};
