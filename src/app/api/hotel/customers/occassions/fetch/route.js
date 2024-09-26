import { fetch_customer_occassions } from "./controller";

export async function POST(request) {
	try {
		const data = await request.json();
		const result = await fetch_customer_occassions(data);
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
				message: `Error Fetching Occassions: ${error.message}`,
				output: []
			},
			{
				status: 500
			}
		);
	}
}
