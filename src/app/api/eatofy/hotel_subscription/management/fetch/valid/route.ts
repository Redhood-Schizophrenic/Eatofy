import { fetch_hotel_subscriptions, fetch_hotel_subscription } from "./controller";

export async function POST(request: Request) {
	try {
		const data = await request.json();
		const result = await fetch_hotel_subscription(data);
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
				message: `Error Fetching Hotel's Valid Subscriptions: ${error.message}`,
				output: []
			},
			{
				status: 500
			}
		);
	}
}

export async function GET() {
	try {
		const result = await fetch_hotel_subscriptions();
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
				message: `Error Fetching Valid Subscriptions: ${error.message}`,
				output: []
			},
			{
				status: 500
			}
		);
	}
}
