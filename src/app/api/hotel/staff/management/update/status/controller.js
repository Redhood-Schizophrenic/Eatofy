import { update_staff_status } from "@/db/crud/staff/management/update";

export async function update_staff(data) {

	try {

		const staff_id = data['staff_id'] || null;
		const status = data['status'] || null;

		// Default Invalid Checker
		if ( staff_id == null || status == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Updating the Staff Status
		const result = await update_staff_status({
			staff_id,
			status
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
