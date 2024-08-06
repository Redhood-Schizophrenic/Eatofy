import { create_staff_attendance } from "@/db/crud/staff/attendance/create";
import { check_staff_attendance } from "@/db/crud/staff/attendance/read";

export async function add_staff_attendance(data) {
	try {

		const date = data['date'] || null;
		const arrival_time = data['arrival_time'] || null;
		const departure_time = data['departure_time'] || null;
		const type = data['type'] || null;
		const note = data['note'] || null;
		const staff_id = data['staff_id'] || null;

		// Default Invalid Checker
		if (date == null || arrival_time == null || departure_time == null || type == null || staff_id == null) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Existing Staff Attendance entry
		const existingStaffAttendance = await check_staff_attendance({ date, staff_id });
		if (existingStaffAttendance.returncode == 200) {
			return {
				returncode: 400,
				message: "Entry Exists.",
				output: existingStaffAttendance.output
			};
		}


		// Adding the Customer
		const result = await create_staff_attendance({
			date,
			arrival_time,
			departure_time,
			type,
			note,
			staff_id
		});

		if (result.returncode == 200) {
			return {
				returncode: 200,
				message: "Staff Attendance Added",
				output: result.output
			};
		}
		else {
			return {
				returncode: result.returncode,
				message: result.message,
				output: result.output
			};
		}


	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
