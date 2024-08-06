import { update_subscription_status } from "@/db/crud/subscriptions/management/update";

export async function update_subscription(data) {
	try {

		const subscription_id = data['subscription_id'];
		const status = data['status'];

		// Default Invalid Checker
		if ( subscription_id == null || status == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Updating the Table Status
		const result = await update_subscription_status({
			subscription_id,
			status
		});

		return {
			returncode: 200,
			message: "Table Updated",
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
