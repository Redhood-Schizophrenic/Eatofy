import { ApiResponse } from "@/types/ApiResponse";
import { read_hotel_staffs_attendance } from "@/db/crud/staff/attendance/read";

export async function fetch_hotel_staff_attendance(data: any): Promise<ApiResponse> {
	try {

		const hotel_id: string | null = data['hotel_id'];
		const date: string | null = data['date'];

		// Default Invalid Checker
		if ( hotel_id == null || date == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Getting the Staff's Attendance Data
		const result = await read_hotel_staffs_attendance({
			hotel_id,
			date
		});

		return {
			returncode: 200,
			message: "Hotel's Staff Attendance Fetched",
			output: result.output
		};

	} catch (error: any) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
