import { update_menu_category_status } from "@/db/crud/menus/category/update";

export async function update_menu_category(data) {
	try {

		const category_id = data['category_id'];
		const status = data['status'];

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

		return result;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
