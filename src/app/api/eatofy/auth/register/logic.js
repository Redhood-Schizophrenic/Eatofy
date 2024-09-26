import db from "@/db/connector";

export async function register_user(data) {
	try {

		const username = data['username'];
		const email = data['email'];
		const password = data['password'];

		// Default Invalid Checker
		if (username == null || email == null || password == null ||
			username == null || email == null || password == null ||
			username == null || email == null || password == null
		) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}


		// Existing User
		const existingUsername = await db.user.findMany({
			where: {
				Username: { equals: username }
			}
		});

		if (existingUsername.length != 0) {
			return {
				returncode: 307,
				message: 'Username Exists, please login',
				output: []
			}
		}

		const existingEmail = await db.user.findMany({
			where: {
				Email: { equals: email }
			}
		});

		if (existingEmail.length != 0) {
			return {
				returncode: 307,
				message: 'User Email Exists, please login',
				output: []
			}
		}

		// Inserting the User
		const result = await db.user.create({
			data: {
				Username: username,
				Email: email,
				Password: password
			},
		});

		db.$disconnect();

		return {
			returncode: 200,
			message: "User Registered",
			output: result
		};

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}

