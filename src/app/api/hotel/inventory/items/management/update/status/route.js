import { update_status } from "./controller";

export async function PUT(request) {
	try {
		const data = await request.json();
		const result = await update_status(data);
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
				message: `Error Updating Item's Status: ${error.message}`,
				output: []
			},
			{
				status: 500
			}
		);
	}
}
