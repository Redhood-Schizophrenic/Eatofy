import { register_user } from "./logic";

export async function POST(request) {
	try {
		const data = await request.json();
		const result = await register_user(data);
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
				message: `Error Registering user: ${error.message}`,
				output: []
			}
		);
	}
}

