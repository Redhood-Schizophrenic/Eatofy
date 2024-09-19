import { update_customer_wallet } from "@/db/crud/customers/management/update";

export async function update_customer(data) {
	try {

		const customer_id = data['customer_id'];
		const eatocoins = data['eatocoins'];

		// Default Invalid Checker
		if (
			customer_id == null ||
			customer_id == undefined ||
			customer_id == ""
		) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Updating the Table Status
		const result = await update_customer_wallet({
			customer_id,
			eatocoins
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
