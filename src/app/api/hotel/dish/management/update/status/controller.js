import { update_dish_status } from "@/db/crud/menus/dishes/update/update";

export async function update_dish(data) {
	try {

		const dish_id = data['dish_id'] || null;
		const status = data['status'] || null;

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

		return result;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
