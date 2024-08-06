import { read_menu } from "@/db/crud/menus/management/read";
import { create_menu } from "@/db/crud/menus/management/create";

export async function add_menu(data) {
	try {

		const dish_id = data['dish_id'] || null;
		const section_id = data['section_id'] || null;
		const price = data['price'] || null;

		// Default Invalid Checker
		if ( dish_id == null || section_id == null || price == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Existing Dish 
		const existingDish = await read_menu({ dish_id, section_id });
		if ( existingDish.returncode == 200 ) {
			return existingDish;
		}

		// Inserting the Dish
		const result = await create_menu({
			dish_id,
			section_id,
			price
		});

		if ( result.returncode == 200 ) {

			return {
				returncode: 200,
				message: "Menu Added",
				output: result.output
			};
		}
		else {
			return result;
		}


	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
