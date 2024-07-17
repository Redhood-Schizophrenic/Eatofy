import { create_hotel_subscription } from "@/db/crud/hotel_subscription/management/create";
import { ApiResponse } from "@/types/ApiResponse";
// import { read_existing_subscription } from "@/db/crud/hotel_subscription/management/read";

export async function add_hotel_subscription(data: any): Promise<ApiResponse> {
	try {

		const is_valid: boolean | null = data['is_valid'];
		const start_date: string | null = data['start_date'];
		const end_date: string | null = data['end_date'];
		const hotel_id: string | null = data['hotel_id'];
		const subscription_id: string | null = data['subscription_id'];


		// Default Invalid Checker
		if (is_valid == null || start_date == null || end_date == null || typeof is_valid === "string" || typeof is_valid === "number" || hotel_id == null || subscription_id == null) {

			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// // Existing Subscription
		// const existingSubscription = await read_existing_subscription({ hotel_id });
		// if (existingSubscription.returncode != 400) {
		//
		// 	const start_date_string = existingSubscription.output[0].EndDate;
		// 	const start__date = new Date(start_date_string);
		// 	const new_end__date = new Date(start_date_string);
		// 	let end__date = new_end__date.toISOString
		// 	return {
		// 		returncode: 400,
		// 		message: "Subscription Exists.",
		// 		output: []
		// 	};
		//
		// }

		// Inserting the Section
		const result = await create_hotel_subscription({
			is_valid,
			start_date,
			end_date,
			hotel_id,
			subscription_id
		});

		if (result.returncode == 200) {

			return {
				returncode: 200,
				message: "Hotel Subscription Added",
				output: Array.isArray(result.output) ? result.output : [result.output as any]
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

