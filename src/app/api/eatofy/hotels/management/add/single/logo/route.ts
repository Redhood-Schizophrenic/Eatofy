import { add_hotel } from "./controller";

export async function POST(request: Request) {
	try {
		const data = await request.formData();
		const result = await add_hotel(data);
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
				message: `Error Adding Hotel: ${error.message}`,
				output: []
			},
			{
				status: 500
			}
		);
	}
}

