import { update_dish_image } from "@/db/crud/menus/dishes/update/update";

export async function update_image(data) {
	try {

		const dish_id = data.get('dish_id') || null;
		const dish_image = data.get('dish_image') || null;

		if ( dish_id == null || dish_image == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Image Buffer Converter
		const array_buffer = await dish_image.arrayBuffer();
		const uint8array = new Uint8Array(array_buffer);
		const buffer = Buffer.from(uint8array);
		

		// Inserting the Hotel
		const result = await update_dish_image({
			dish_id,
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
