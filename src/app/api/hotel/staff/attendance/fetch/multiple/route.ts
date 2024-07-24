import { fetch_hotel_staff_attendance } from "./controller";

export async function POST(request: Request) {
	try {
		const data = await request.json();
		const result = await fetch_hotel_staff_attendance(data);
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
				message: `Error Fetching Hotel's Staff Attendance: ${error.message}`,
				output: []
			},
			{
				status: 500
			}
		);
	}
}

