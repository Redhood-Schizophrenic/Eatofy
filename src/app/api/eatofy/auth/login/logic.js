import db from "@/db/connector";

export async function login_user(data) {
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
		existingEmail.forEach((user) => {
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

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}

