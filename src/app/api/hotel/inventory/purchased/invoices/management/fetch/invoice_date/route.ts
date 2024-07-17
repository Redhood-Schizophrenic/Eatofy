import { date_filter } from "./controller";

export async function POST(request: Request) {
	try {
		const data = await request.json();
		const result = await date_filter(data);
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
				message: `Error Filtering Data: ${error.message}`,
				output: []
			},
			{
				status: 500
			}
		);
	}
}

