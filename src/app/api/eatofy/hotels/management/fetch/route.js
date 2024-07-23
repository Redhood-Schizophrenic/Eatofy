import { fetch_hotel, fetch_hotels } from "./logic";

export async function POST(request) {
	try {
		const data = await request.json();
		const result = await fetch_hotel(data);
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
				message: `Error Fetching Hotel: ${error.message}`,
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
		const result = await fetch_hotels();
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
				message: `Error Fetching Hotel: ${error.message}`,
				output: []
			},
			{
				status: 500
			}
		);
	}
}
