import { update_compliance } from "./controller";

export async function PUT(request: Request) {
	try {
		const data = await request.formData();
		const result = await update_compliance(data);
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
				message: `Error Updating Details: ${error.message}`,
				output: []
			},
			{
				status: 500
			}
		);
	}
}
