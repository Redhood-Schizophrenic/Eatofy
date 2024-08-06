import db from "@/db/connector";

export async function update_password(data) {
	try {

		const email = data['email'];
		const old_password = data['old_password'];
		const new_password = data['new_password'];

		// Default Invalid Checker
		if (old_password == null || email == null || new_password == null ||
			old_password == undefined || email == undefined || new_password == undefined ||
			old_password == "" || email == "" || new_password == ""
		) {
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
			let result;

			for (const user of existingEmail) {
				if (user.Password === old_password) {
					const user_updated = await db.user.update({
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

		} catch (error) {
			return {
				returncode: 500,
				message: error.message,
				output: [],
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
