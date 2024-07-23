import db from "@/db/connector";
import { ApiResponse } from "@/types/ApiResponse";

export async function update_password(data: any): Promise<ApiResponse> {
	try {

		const email: string | null = data['email'];
		const old_password: string | null = data['old_password'];
		const new_password: string | null = data['new_password'];

		// Default Invalid Checker
		if (old_password == null || email == null || new_password == null) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Check whether user exists
		const existingEmail = await db.user.findMany({
			where: {
				Email: { equals: email }
			}
		});

		if (existingEmail.length == 0) {
			return {
				returncode: 307,
				message: "User Email doesn't Exists, please register",
				output: []
			}
		}

		// Updating the User's Password
		try {
			let result: any;

			for (const user of existingEmail) {
				if (user.Password === old_password) {
					const user_updated: any = await db.user.update({
						where: {
							Email: email,
						},
						data: {
							Password: new_password,
						},
					});

					result = {
						returncode: 200,
						message: "User Password Updated",
						output: user_updated,
					};

					break; // Exit the loop once password is updated
				}
			}

			db.$disconnect();

			if (!result) {
				return {
					returncode: 400,
					message: "User not found or old password incorrect",
					output: [],
				};
			}

			return result;

		} catch (error: any) {
			return {
				returncode: 500,
				message: error.message,
				output: [],
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

