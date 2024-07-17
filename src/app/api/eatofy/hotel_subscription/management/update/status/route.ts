import { update_hotel_subscription } from "./controller";

export async function PUT(request: Request) {
	try {
		const data = await request.json();
		const result = await update_hotel_subscription(data);
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
				message: `Error Updating Subscription: ${error.message}`,
				output: []
			},
			{
				status: 500
			}
		);
	}
}
