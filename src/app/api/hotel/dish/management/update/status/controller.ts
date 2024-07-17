import { ApiResponse } from "@/types/ApiResponse";
import { update_dish_status } from "@/db/crud/menus/dishes/update/update";

export async function update_dish(data: any): Promise<ApiResponse> {
	try {

		const dish_id: string | null = data['dish_id'];
		const status: string | null = data['status'];

		// Default Invalid Checker
		if ( dish_id == null || status == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Updating the Section
		const result = await update_dish_status({
			dish_id,
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
