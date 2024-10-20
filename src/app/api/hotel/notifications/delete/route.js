import { notifications_delete } from "./controller";

export async function DELETE() {
	try {
		const result = await notifications_delete();
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
				message: `Error deleting notifications: ${error.message}`,
				output: []
			},
			{
				status: 500
			}
		);
	}
}
