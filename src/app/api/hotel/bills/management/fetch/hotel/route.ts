import { fetch_hotel_bills } from "./controller";

export async function POST(request: Request) {
	try {
		const data = await request.json();
		const result = await fetch_hotel_bills(data);
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
				message: `Error Fetching Bills: ${error.message}`,
				output: []
			},
			{
				status: 500
			}
		);
	}
}

