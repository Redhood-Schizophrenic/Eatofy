import { bill_status_update } from "@/db/crud/bills/management/update";

export async function update_status_bill(data) {
	try {

		const bill_id = data['bill_id'];
		
		// Default Invalid Checker
		if (bill_id == null || bill_id == undefined || bill_id == "" ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}
		// Updating the Customer
		const result = await bill_status_update({
			bill_id,
			status: "Inactive"
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
