import { create_hotel_subscription } from "@/db/crud/hotel_subscription/management/create";
import { ApiResponse } from "@/types/ApiResponse";
// import { read_existing_subscription } from "@/db/crud/hotel_subscription/management/read";

export async function add_hotel_subscription(data: any): Promise<ApiResponse> {
	try {

		const start_date: string | null = data['start_date'];
		const end_date: string | null = data['end_date'];
		const hotel_id: string | null = data['hotel_id'];
		const subscription_id: string | null = data['subscription_id'];


		// Default Invalid Checker
		if ( start_date == null || end_date == null || hotel_id == null || subscription_id == null) {

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

	} catch (error: any) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}

