import { overall_staff_report } from "./controller";

export async function POST(request) {
	try {
		const data = await request.json();
		const result = await overall_staff_report(data);
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
				message: `Error Fetching Staff data: ${error.message}`,
				output: []
			},
			{
				status: 500
			}
		);
	}
}
