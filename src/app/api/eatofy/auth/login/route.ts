import { login_user } from "./logic";
export async function POST(request: Request) {
	try {
		const data = await request.json();
		const result = await login_user(data);
		return Response.json(
			{
				returncode: result.returncode,
				message: result.message,
				output: result.output
			}
		);
	}
	catch (error: any) {
		return Response.json(
			{
				returncode: 500,
				message: `Error Authenticating user: ${error.message}`,
				output: []
			}
		);
	}
}

