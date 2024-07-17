import { ApiResponse } from "@/types/ApiResponse";
import { update_customer_status } from "@/db/crud/customers/management/update";

export async function update_customer(data: any): Promise<ApiResponse> {
	try {

		const customer_id: string | null = data['customer_id'];
		const status: string | null = data['status'];

		// Default Invalid Checker
		if ( customer_id == null || status == null ) {
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

	} catch (error: any) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
