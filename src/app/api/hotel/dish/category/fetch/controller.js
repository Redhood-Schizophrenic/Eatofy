import { read_menu_categories } from "@/db/crud/menus/category/read";

export async function fetch_menu_categories(data) {
	try {

		const hotel_id = data['hotel_id'];

		// Default Invalid Checker
		if ( hotel_id == null || hotel_id == undefined || hotel_id == "" ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Getting the Categories
		const result = await read_menu_categories({
			hotel_id
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
