import { update_menu_category_details } from "@/db/crud/menus/category/update";

export async function update_details(data) {
	try {

		const category_id = data['category_id'];
		const category_name = data['category_name'];
		const description = data['description'];

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

		return result;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
