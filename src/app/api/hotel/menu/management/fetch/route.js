import { fetch_menus } from "./controller";

export async function POST(request) {
	try {
		const data = await request.json();
		const result = await fetch_menus(data);
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
				message: `Error Fetching Menus: ${error.message}`,
				output: []
			},
			{
				status: 500
			}
		);
	}
}
