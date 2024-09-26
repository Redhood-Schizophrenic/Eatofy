import { update_hotel_profile } from "./logic";

export async function PUT(request) {
	try {
		const data = await request.formData();
		const result = await update_hotel_profile(data);
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
				message: `Error Updating Hotel Profile: ${error.message}`,
				output: []
			},
			{
				status: 500
			}
		);
	}
}

