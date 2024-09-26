import { create_hotel_subscription } from "@/db/crud/hotel_subscription/management/create";

export async function add_hotel_subscription(data) {
	try {

		const start_date = data['start_date'];
		const end_date = data['end_date'];
		const hotel_id = data['hotel_id'];
		const subscription_id = data['subscription_id'];


		// Default Invalid Checker
		if (start_date == null || end_date == null || hotel_id == null || subscription_id == null ||
			start_date == undefined || end_date == undefined || hotel_id == undefined || subscription_id == undefined ||
			start_date == "" || end_date == "" || hotel_id == "" || subscription_id == ""
		) {

			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Inserting the Subscription
		const result = await create_hotel_subscription({
			is_valid: true,
			start_date,
			end_date,
			hotel_id,
			subscription_id
		});

		if (result.returncode == 200) {

			return {
				returncode: 200,
				message: "Hotel Subscription Added",
				output: result.output
			};
		}
		else {
			return {
				returncode: 500,
				message: result.message,
				output: []
			};

		}

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}

