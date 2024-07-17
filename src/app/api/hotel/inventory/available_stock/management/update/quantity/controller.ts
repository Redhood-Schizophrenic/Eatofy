import { ApiResponse } from "@/types/ApiResponse";
import { update_available_stock_quantity } from "@/db/crud/inventory/available_stock/update";

export async function update_available_quantity(data: any): Promise<ApiResponse> {

	try {

		const available_stock_id: string | null = data['available_stock_id'];
		const quantity: string | null = data['quantity'];

		// Default Invalid Checker
		if ( available_stock_id == null || quantity == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Updating the Quantity
		const result = await update_available_stock_quantity({
			available_stock_id,
			quantity
		});

		return {
			returncode: 200,
			message: "Quantity Updated",
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
