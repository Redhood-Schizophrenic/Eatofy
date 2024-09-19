import { fetch_dashboard } from "./logic";

export async function GET() {
	try {
		const result = await fetch_dashboard();
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
				message: `Error Fetching Hotel Subscriptions: ${error.message}`,
				output: []
			},
			{
				status: 500
			}
		);
	}
}

