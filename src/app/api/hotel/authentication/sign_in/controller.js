import { staff_login } from "@/db/crud/staff/management/read";
import bcrypt from 'bcrypt';

export async function auth_staff_login(data) {
	try {

		const email = data['email'];
		const password = data['password'];

		// Default Invalid Checker
		if (email == null || password == null ||
			email == undefined || password == undefined ||
			email == "" || password == ""
		) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		const result = await staff_login({
			email
		});

		if (result.returncode == 200) {

			for (const user of result.output) {
				const match = await bcrypt.compare(password, user.HashedPassword);
				if (match) {
					return {
						returncode: 200,
						message: "User Authenticated",
						output: result.output
					};
				}
			}
			return {
				returncode: 400,
				message: "Password doesn't match",
				output: result.output
			};

		}
		else {
			return {
				returncode: 400,
				message: "Authentication Failed or Subscription Expired",
				output: []
			};
		}

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
