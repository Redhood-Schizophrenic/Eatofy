import { add_customer } from "./controller";

export async function POST(request) {
	try {
		const data = await request.json();
		const result = await add_customer(data);
		return Response.json(
			{
				returncode: result.returncode,
				message: result.message,
				output: result.output
			},
			{
				status: result.returncode
			}
		);
	}
	catch (error) {
		return Response.json(
			{
				returncode: 500,
				message: `Error Adding Customer: ${error.message}`,
				output: []
			},
			{
				status: 500
			}
		);
	}
}
