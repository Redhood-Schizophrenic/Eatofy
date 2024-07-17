import { fetch_subscriptions } from "./controller";

export async function GET() {
	try {
		const result = await fetch_subscriptions();
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
				message: `Error Fetching Table: ${error.message}`,
				output: []
			},
			{
				status: 500
			}
		);
	}
}

