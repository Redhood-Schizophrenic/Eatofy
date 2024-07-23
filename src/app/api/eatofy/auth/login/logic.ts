import db from "@/db/connector";
import { ApiResponse } from "@/types/ApiResponse";

export async function login_user(data: any): Promise<ApiResponse> {
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


		// If User doesn't exists
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

		//Update Password
		let result;
		existingEmail.forEach((user: any) => {
			if (user.Password == password) {

				result = {
					returncode: 200,
					message: "User Logged In",
					output: existingEmail
				};

				return;
			}
		});

		db.$disconnect()

		if(result!=undefined)
		{
			return result;
		}

		return {
			returncode: 400,
			message: "Password Doesn't Match",
			output: []
		};

	} catch (error: any) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}

