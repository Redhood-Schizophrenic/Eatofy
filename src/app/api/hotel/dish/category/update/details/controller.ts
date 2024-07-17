import { ApiResponse } from "@/types/ApiResponse";
import { update_menu_category_details } from "@/db/crud/menus/category/update";

export async function update_details(data: any): Promise<ApiResponse> {
	try {

		const category_id: string | null = data['category_id'];
		const category_name: string | null = data['category_name'];
		const description: string | null = data['description'];

		// Default Invalid Checker
		if ( category_id == null || category_name == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Updating the Details
		const result = await update_menu_category_details({
			category_id,
			category_name,
			description
		});

		return {
			returncode: 200,
			message: "Menu Category Details Updated",
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
