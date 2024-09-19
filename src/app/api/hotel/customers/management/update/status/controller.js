import { update_customer_status } from "@/db/crud/customers/management/update";

export async function update_customer(data) {
	try {

		const customer_id = data['customer_id'];
		const status = data['status'];

		// Default Invalid Checker
		if ( 
			customer_id == null || status == null ||
			customer_id == undefined || status == undefined ||
			customer_id == "" || status == ""
		) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Updating the Table Status
		const result = await update_customer_status({
			customer_id,
			status
		});

		return {
			returncode: 200,
			message: "Status Updated",
			output: result.output
		};

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
