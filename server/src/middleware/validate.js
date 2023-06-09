const Joi = require('joi');

const validate = (schema) => (req, res, next) => {
  const { error } = schema.body.validate(req.body);

  if (error) {
    const { details } = error;
    const message = details.map((i) => i.message.replace(/['"]+/g, '')).join(',');
    return res.status(422).json({ status: false, error: message });
  }

  return next();
};

module.exports = validate;
