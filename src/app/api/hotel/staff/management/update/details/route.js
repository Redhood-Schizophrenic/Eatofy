import { update_staff } from "./controller";

export async function PUT(request) {
	try {
		const data = await request.json();
		const result = await update_staff(data);
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
				message: `Error Updating Staff Details: ${error.message}`,
				output: []
			},
			{
				status: 500
			}
		);
	}
}
