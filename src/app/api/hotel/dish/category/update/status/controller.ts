import { ApiResponse } from "@/types/ApiResponse";
import { update_menu_category_status } from "@/db/crud/menus/category/update";

export async function update_menu_category(data: any): Promise<ApiResponse> {
	try {

		const category_id: string | null = data['category_id'];
		const status: string | null = data['status'];

		// Default Invalid Checker
		if ( category_id == null || status == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Updating the Status
		const result = await update_menu_category_status({
			category_id,
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
