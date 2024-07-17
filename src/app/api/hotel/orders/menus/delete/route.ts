import { delete_an_order } from "./controller";

export async function DELETE(request: Request) {
	try {
		const data = await request.json();
		const result = await delete_an_order(data);
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
				message: `Error Deleting Orders: ${error.message}`,
				output: []
			},
			{
				status: 500
			}
		);
	}
}
