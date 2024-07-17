import { staff_login } from "@/db/crud/staff/management/read";
import { ApiResponse } from "@/types/ApiResponse";
import bcrypt from 'bcrypt';

export async function auth_staff_login(data: any): Promise<ApiResponse> {
	try {

		const email: string | null = data['email'];
		const password: string | null = data['password'];

		// Default Invalid Checker
		if (email == null || password == null) {
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
			console.error(result.message);
			return {
				returncode: 400,
				message: "Authentication Failed",
				output: []
			};
		}

	} catch (error: any) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
