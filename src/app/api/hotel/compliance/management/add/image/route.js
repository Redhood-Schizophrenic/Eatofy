import { add_compliance } from "./controller";

export async function POST(request) {
	try {
		const data = await request.formData();
		const result = await add_compliance(data);
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
				message: `Error Adding Compliance: ${error.message}`,
				output: []
			},
			{
				status: 500
			}
		);
	}
}
