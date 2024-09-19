import { read_dish } from "@/db/crud/menus/dishes/read/read";
import { create_dish_with_image } from "@/db/crud/menus/dishes/create/create";

export async function add_dish(data) {
	try {

		const hotel_id = data.get('hotel_id');
		const dish_name = data.get('dish_name');
		const dish_code = data.get('dish_code');
		const dish_type = data.get('dish_type');
		const description = data.get('description');
		const category_id = data.get('category_id');
		const dish_image = data.get('dish_image');

		if (hotel_id == null || dish_name == null || dish_code == null || dish_type == null || category_id == null || dish_image == null ||
			hotel_id == undefined || dish_name == undefined || dish_code == undefined || dish_type == undefined || category_id == undefined || dish_image == undefined ||
			hotel_id == "" || dish_name == "" || dish_code == "" || dish_type == "" || category_id == "" || dish_image == "" ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Existing Dish
		const existingDish = await read_dish({ hotel_id, dish_name, dish_code });
		if (existingDish.returncode != 400) {
			return existingDish;
		}


		// Image Buffer Converter
		const array_buffer = await dish_image.arrayBuffer();
		const uint8array = new Uint8Array(array_buffer);
		const buffer = Buffer.from(uint8array);


		// Inserting the Hotel
		const result = await create_dish_with_image({

			dish_name,
			dish_code,
			dish_type,
			description,
			hotel_id,
			category_id,
			buffer, // Ensure 'buffer' matches your structure for handling the logo

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
