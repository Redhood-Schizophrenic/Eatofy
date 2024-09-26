import { read_hotel_staffs_attendance } from "@/db/crud/staff/attendance/read";

export async function fetch_hotel_staff_attendance(data) {
	try {

		const hotel_id = data['hotel_id'] || null;
		const date = data['date'] || null;

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

		return result;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
