import { read_dish } from "@/db/crud/menus/dishes/read/read";
import { create_dish_without_image } from "@/db/crud/menus/dishes/create/create";

export async function add_dish(data) {
	try {

		const hotel_id = data['hotel_id'];
		const dish_name = data['dish_name'];
		const dish_code = data['dish_code'];
		const dish_type = data['dish_type'];
		const description = data['description'];
		const category_id = data['category_id'];

		// Default Invalid Checker
		if ( 
			hotel_id == null || dish_name == null || dish_code == null || dish_type == null || category_id == null || 
			hotel_id == undefined || dish_name == undefined || dish_code == undefined || dish_type == undefined || category_id == undefined ||
			hotel_id == "" || dish_name == "" || dish_code == "" || dish_type == "" || category_id == "" 
		) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Existing Dish
		const existingDish = await read_dish({ hotel_id, dish_name, dish_code });
		if ( existingDish.returncode != 400 ) {
			return existingDish;
		}

		// Inserting the Dish
		const result = await create_dish_without_image({
			dish_name,
			dish_code,
			description,
			dish_type,
			category_id,
			hotel_id,
			buffer: null
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
