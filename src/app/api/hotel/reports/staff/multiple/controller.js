import { read_staffs_attendance } from "@/db/crud/staff/attendance/read";

const datetime_formatter = (date) => {
	// Get the day, month, and year
	const day = date.getDate();
	const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	const month = monthNames[date.getMonth()];
	const year = date.getFullYear();

	// Combine the day, month, and year with the ordinal suffix
	const formattedDate = `${day} ${month} ${year}`;
	return formattedDate;
}

export async function overall_staff_report(data) {
	try {

		const hotel_id = data['hotel_id'] || null;
		const from = data['from'] || null;
		const to = data['to'] || null;

		// Default Invalid Checker
		if (hotel_id == null || from == null || to == null) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}
		}
		const from_date = new Date(from);
		const to_date = new Date(to);

		// Fetch 
		const read_data = await read_staffs_attendance({ hotel_id });
		return {
			read_data
		}
		// await console.log(data);
		

	} catch (error) {
		console.error(error)
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}