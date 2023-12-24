import Joi from "joi";

const userIdSchema = Joi.string()
  .required()
  .pattern(/^[0-9a-fA-F]{24}$/)
  .message("'{{#label}}' must be a valid mongo id");

const passwordSchema = Joi.string()
  .label("Password")
  .min(8)
  .max(128)
  .pattern(/^(?=.*[a-zA-Z])(?=.*\d).*$/, "password")
  .message({
    "string.base": "'{{#label}}' must be a string",
    "string.min": "'{{#label}}' must be at least 8 characters",
    "string.max": "'{{#label}}' must contain at most 128 characters",
    "string.pattern.name": "password",
    "string.pattern.base":
      "'{{#label}}' must contain at least 1 letter and 1 number"
  });

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

const getUser = {
  params: Joi.object().keys({
    userId: userIdSchema
  })
};

const updateUser = {
  params: Joi.object().keys({
    userId: userIdSchema
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: passwordSchema,
      name: Joi.string()
    })
    .min(1)
};

const deleteUser = {
  params: Joi.object().keys({
    userId: userIdSchema
  })
};

export default {
  getUsers,
  getUser,
  updateUser,
  deleteUser
};
