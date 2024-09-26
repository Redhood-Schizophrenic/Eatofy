import { fetch_hotel_staff } from "./controller";

export async function POST(request) {
	try {
		const data = await request.json();
		const result = await fetch_hotel_staff(data);
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
				message: `Error Fetching Hotel's Staff: ${error.message}`,
				output: []
			},
			{
				status: 500
			}
		);
	}
}
