import { update_hotel_subscription_status } from "@/db/crud/hotel_subscription/management/update";

export async function update_hotel_subscription(data) {
	try {

		const hotel_subscription_id = data['hotel_subscription_id'];
		const status = data['status'];
		const is_valid = data['is_valid'];

		// Default Invalid Checker
		if (hotel_subscription_id == null || status == null || is_valid == null ||
			hotel_subscription_id == undefined || status == undefined || is_valid == undefined ||
			hotel_subscription_id == "" || status == "" || is_valid == ""
		) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Updating the Table Status
		const result = await update_hotel_subscription_status({
			hotel_subscription_id,
			status,
			is_valid
		});

		if (result.returncode == 200) {
			return {
				returncode: 200,
				message: "Hotel Subscription Updated",
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
