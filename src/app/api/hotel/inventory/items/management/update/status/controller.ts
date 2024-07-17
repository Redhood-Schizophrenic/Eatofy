import { ApiResponse } from "@/types/ApiResponse";
import { update_item_status } from "@/db/crud/inventory/items/update";

export async function update_status(data: any): Promise<ApiResponse> {
	try {

		const item_id: string | null = data['item_id'];
		const status: string | null = data['status'];

		// Default Invalid Checker
		if ( item_id == null || status == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Updating the Status
		const result = await update_item_status({
			item_id,
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
