import { bill_status_update } from "@/db/crud/bills/management/update";
import { read_bill_info } from "@/db/crud/bills/management/read";
import { update_table_status } from "@/db/crud/tables/management/update";

export async function update_status_bill(data) {
	try {

		const bill_id = data['bill_id'];

		// Default Invalid Checker
		if (bill_id == null || bill_id == undefined || bill_id == "") {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		const existingBill = await read_bill_info({ bill_id });

		if ( existingBill.output[0].TableId != "" ) {

			// Updating the Table Status
			await update_table_status({
				status: "Available",
				table_id: existingBill.output[0].TableId
			});
		}

			// Updating the Bill Status
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
