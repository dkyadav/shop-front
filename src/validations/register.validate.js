
import Joi from "joi";

export const RegisterSchema = {
    name: Joi.string().alphanum().min(3).max(30).required(),

    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),

    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required()
      .messages({
        "string.pattern.base": `Password should be between 3 to 30 characters and contain letters or numbers only`,
        "string.empty": `Password cannot be empty`,
        "any.required": `Password is required`,
      }),

    // cpassword: Joi.valid(Joi.ref("password")).messages({
    //   "any.only": "The two passwords do not match",
    //   "any.required": "Please re-enter the password",
    // }),
  };