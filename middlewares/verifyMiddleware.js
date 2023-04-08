const Joi = require("joi");

module.exports = {
  verifyMiddleware: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
    });

    const result = schema.validate(req.body);

    if (result.error) {
      return res.status(400).json({ status: result.error.details });
    }
    next();
  },
};
