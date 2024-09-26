import { update_dish_details } from "@/db/crud/menus/dishes/update/update";

export async function update_details(data) {
	try {

		const hotel_id = data['hotel_id'] || null;
		const dish_id = data['dish_id'] || null;
		const dish_name = data['dish_name'] || null;
		const dish_code = data['dish_code'] || null;
		const dish_type = data['dish_type'] || null;
		const description = data['description'] || null;

		// Default Invalid Checker
		if (hotel_id == null || dish_name == null || dish_code == null || dish_type == null || dish_id == null) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}
		
		// Updating the Dish details
		const result = await update_dish_details({
			dish_name,
			dish_code,
			description,
			dish_type,
			dish_id
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
