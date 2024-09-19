import { update_staff_status } from "@/db/crud/staff/management/update";

export async function delete_staff_account(data) {
	try {

		const staff_id = data['staff_id'];

		// Default Invalid Checker
		if ( staff_id == null || staff_id == undefined || staff_id == "" ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Updating the Status
		const result = await update_staff_status({
			staff_id,
			status: "Inactive"
		});

		if (result.returncode == 200) {
			return {
				returncode: 200,
				message: "Account Deleted",
				output: result.output
			};
		}

		return result;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
