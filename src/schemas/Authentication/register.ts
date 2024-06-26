import { z } from "zod";

const usernameValidation = z
	.string();

const emailValidation = z
	.string()
	.email({message: 'Invalid Email Address.'});

const passwordValidation = z
	.string()
	.min(6, {message: "Password must be atleast 6 characters."});

export const register = z.object({
	username: usernameValidation,
	email: emailValidation,
	password: passwordValidation
})

