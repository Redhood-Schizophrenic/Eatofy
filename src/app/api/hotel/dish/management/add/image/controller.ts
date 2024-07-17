import { ApiResponse } from "@/types/ApiResponse";
import { read_dish } from "@/db/crud/menus/dishes/read/read";
import { create_dish_with_image } from "@/db/crud/menus/dishes/create/create";

export async function add_dish(data: any): Promise<ApiResponse> {
	try {

		const hotel_id: string | null = data.get('hotel_id');
		const dish_name: string | null = data.get('dish_name');
		const dish_code: string | null = data.get('dish_code');
		const dish_type: string | null = data.get('dish_type');
		const description: string | null = data.get('description');
		const category_id: string | null = data.get('category_id');
		const dish_image: File | null = data.get('dish_image');

		if ( hotel_id == null || dish_name == null || dish_code == null || dish_type == null || category_id == null || dish_image == null ) {
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

		return {
			returncode: 200,
			message: "Dish Added",
			output: result.output
		};

	} catch (error: any) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
