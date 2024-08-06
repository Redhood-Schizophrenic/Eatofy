import { add_table } from "./controller";

export async function POST(request) {
	try {
		const data = await request.json();
		const result = await add_table(data);
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
				message: `Error Adding Table: ${error.message}`,
				output: []
			},
			{
				status: 500
			}
		);
	}
}
