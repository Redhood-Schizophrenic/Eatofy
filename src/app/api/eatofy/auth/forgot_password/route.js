import { update_password } from "./logic";

export async function PUT(request) {
	try {
		const data = await request.json();
		const result = await update_password(data);
		return Response.json(
			{
				returncode: result.returncode,
				message: result.message,
				output: result.output
			}
		);
	}
	catch (error) {
		return Response.json(
			{
				returncode: 500,
				message: `Error Updating User's Password: ${error.message}`,
				output: []
			}
		);
	}
}
