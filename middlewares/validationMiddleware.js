const Joi = require("joi");

module.exports = {
  postContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(2).required(),
      email: Joi.string().email().required(),
      phone: Joi.number().min(2).required(),
      favorite: Joi.boolean().optional(),
    });

    const result = schema.validate(req.body);

    if (result.error) {
      return res.status(400).json({ status: result.error.details });
    }
    next();
  },

  putContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(2).optional(),
      email: Joi.string().email().optional(),
      phone: Joi.number().min(2).optional(),
      favorite: Joi.boolean().optional(),
    });

    const result = schema.validate(req.body);

    if (result.error) {
      return res.status(400).json({ status: result.error.details });
    }
    next();
  },

  patchFavoriteValidation: (req, res, next) => {
    const schema = Joi.object({
      favorite: Joi.boolean().required(),
    });

    const result = schema.validate(req.body);

    if (result.error) {
      return res.status(400).json({ status: result.error.details });
    }
    next();
  },
};
