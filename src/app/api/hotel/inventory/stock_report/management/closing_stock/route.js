import { add_closing_inventory } from "./controller";

export async function POST(request) {
	try {
		const data = await request.json();
		const result = await add_closing_inventory(data);
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
				message: `Error Adding Available Stock: ${error.message}`,
				output: []
			},
			{
				status: 500
			}
		);
	}
}

