const Joi = require("joi");

class alumnoValidator {
  check(req, res, next) {
    const schema = Joi.object({
      nombres: Joi.string().trim().required(),
      apellidos: Joi.string().trim().required(),
      matricula: Joi.string().trim().required(),
      promedio: Joi.number().precision(2).required(),
    });
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: "Hubo errores", error });
    }
    next();
  }
}

module.exports = new alumnoValidator();
