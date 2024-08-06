import { update_item_category_details } from "@/db/crud/inventory/items_category/update";

export async function update_item_category(data) {
	try {

		const category_id = data['category_id'] || null;
		const category_name = data['category_name'] || null;
		const description = data['description'] || null;

		// Default Invalid Checker
		if ( category_id == null || category_name == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Updating the Price
		const result = await update_item_category_details({
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
