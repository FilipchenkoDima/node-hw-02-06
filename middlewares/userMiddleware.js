const Joi = require("joi");

module.exports = {
  userRegisterValidation: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(2).required(),
    });

    const result = schema.validate(req.body);

    if (result.error) {
      return res.status(400).json({ status: result.error.details });
    }
    next();
  },
};
