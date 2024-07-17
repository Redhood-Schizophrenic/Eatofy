import { ApiResponse } from "@/types/ApiResponse";
import { update_subscription_status } from "@/db/crud/subscriptions/management/update";

export async function update_subscription(data: any): Promise<ApiResponse> {
	try {

		const subscription_id: string | null = data['subscription_id'];
		const status: string | null = data['status'];

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
