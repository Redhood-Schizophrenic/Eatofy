import { bill_table_update } from "@/db/crud/bills/management/update";

export async function update_table_in_bill(data) {
	try {

		const bill_id = data['bill_id'];
		const table_id = data['hotel_id'];

		// Default Invalid Checker
		if (bill_id == null || table_id == null ||
			bill_id == undefined || table_id == undefined ||
			bill_id == "" || table_id == ""
		) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}
		// Updating the Customer
		const result = await bill_table_update({
			bill_id,
			table_id
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
