import { ApiResponse } from "@/types/ApiResponse";
import { update_hotel_subscription_status } from "@/db/crud/hotel_subscription/management/update";

export async function update_hotel_subscription(data: any): Promise<ApiResponse> {
	try {

		const hotel_subscription_id: string | null = data['hotel_subscription_id'];
		const status: string | null = data['status'];
		const is_valid: boolean | null = data['is_valid'];

		// Default Invalid Checker
		if ( hotel_subscription_id == null || status == null || is_valid == null ) {
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

		return {
			returncode: 200,
			message: "Hotel Subscription Updated",
			output: Array.isArray(result.output) ? result.output : [result.output as any]
		};

	} catch (error: any) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
