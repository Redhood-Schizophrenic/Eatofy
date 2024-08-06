import { update_menu_price } from "@/db/crud/menus/management/update";

export async function update_menu(data) {
	try {

		const menu_id = data['menu_id'] || null;
		const price = data['price'] || null;

		// Default Invalid Checker
		if ( menu_id == null || price == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Updating the Price
		const result = await update_menu_price({
			menu_id,
			price
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
