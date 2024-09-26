import { fetch_cancelled_orders } from "./controller";

export async function POST(request) {
	try {
		const data = await request.json();
		const result = await fetch_cancelled_orders(data);
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
				message: `Error Fetching Cancelled Order: ${error.message}`,
				output: []
			},
			{
				status: 500
			}
		);
	}
}
