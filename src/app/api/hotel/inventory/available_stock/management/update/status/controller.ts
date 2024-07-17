import { ApiResponse } from "@/types/ApiResponse";
import { update_available_stock_status } from "@/db/crud/inventory/available_stock/update";

export async function update_available_stock(data: any): Promise<ApiResponse> {
	try {

		const available_stock_id: string | null = data['available_stock_id'];
		const status: string | null = data['status'];

		// Default Invalid Checker
		if ( available_stock_id == null || status == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Updating the Status
		const result = await update_available_stock_status({
			available_stock_id,
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
