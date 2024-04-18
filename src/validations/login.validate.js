import React from "react";
import Joi from "joi";

// export default function LoginValidate() {
//   return (
//     <div>login.LoginValidate</div>
//   )
// }

export const LoginSchema = {
	email: Joi.string().email({
		minDomainSegments: 2,
		tlds: { allow: ["com", "net"] },
	}),

	password: Joi.string().min(3).required().messages({
		"string.pattern.base": `Password should be between 3 to 30 characters and contain letters or numbers only`,
		"string.empty": `Password cannot be empty`,
		"any.required": `Password is required`,
	}),

};
