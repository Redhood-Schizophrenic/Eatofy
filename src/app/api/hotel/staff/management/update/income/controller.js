import { hotel_employee_promotion } from "@/db/crud/staff/management/update";

export async function update_hotel_staff(data) {
	try {

		const staff_id = data['staff_id'] || null;
		const department_name = data['department_name'] || null;
		const designation = data['designation'] || null;
		const role = data['role'] || null;
		const salary = data['salary'] || null;
		const incentives = data['incentives'] || null;


		// Default Invalid Checker
		if ( staff_id == null || department_name == null || designation == null || role == null || salary == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Updating the Staff Income
		const result = await hotel_employee_promotion({
			staff_id,
			department_name,
			designation,
			role,
			salary,
			incentives
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
