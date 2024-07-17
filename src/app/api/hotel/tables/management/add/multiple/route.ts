import { add_tables } from "./controller";

export async function POST(request: Request) {
	try {
		const data = await request.json();
		const result = await add_tables(data);
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
	catch (error: any) {
		return Response.json(
			{
				returncode: 500,
				message: `Error Adding Tables: ${error.message}`,
				output: []
			},
			{
				status: 500
			}
		);
	}
}

