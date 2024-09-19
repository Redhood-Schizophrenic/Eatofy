import { update_reservation_status } from "@/db/crud/reservations/update";

export async function update_reservation(data) {
	try {

		const reservation_id = data['reservation_id'] || null;
		const status = data['status'] || null;

		// Default Invalid Checker
		if ( reservation_id == null || status == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Updating the Status
		const result = await update_reservation_status({
			reservation_id,
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
