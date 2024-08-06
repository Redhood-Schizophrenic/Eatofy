import { fetch_hotel_bill_data } from "./controller";

export async function POST(request) {
	try {
		const data = await request.json();
		const result = await fetch_hotel_bill_data(data);
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
				message: `Error Fetching Bill data: ${error.message}`,
				output: []
			},
			{
				status: 500
			}
		);
	}
}
