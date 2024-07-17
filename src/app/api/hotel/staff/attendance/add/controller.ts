import { ApiResponse } from "@/types/ApiResponse";
import { create_staff_attendance } from "@/db/crud/staff/attendance/create";
import { check_staff_attendance } from "@/db/crud/staff/attendance/read";

export async function add_staff_attendance(data: any): Promise<ApiResponse> {
	try {

		const date: string | null = data['date'];
		const arrival_time: string | null = data['arrival_time'];
		const departure_time: string | null = data['departure_time'];
		const type: string | null = data['type'];
		const note: string | null = data['note'];
		const staff_id: string | null = data['staff_id'];

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

		if (result.returncode) {
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


	} catch (error: any) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
