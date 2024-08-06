import { update_available_quantity } from "./controller";

export async function PUT(request) {
	try {
		const data = await request.json();
		const result = await update_available_quantity(data);
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
				message: `Error Updating Quantity: ${error.message}`,
				output: []
			},
			{
				status: 500
			}
		);
	}
}
