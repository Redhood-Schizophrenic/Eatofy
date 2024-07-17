import { fetch_purchased_stock } from "./controller";

export async function POST(request: Request) {
	try {
		const data = await request.json();
		const result = await fetch_purchased_stock(data);
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
				message: `Error Fetching Purchased Stock: ${error.message}`,
				output: []
			},
			{
				status: 500
			}
		);
	}
}

