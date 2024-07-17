import { ApiResponse } from "@/types/ApiResponse";
import { read_dish } from "@/db/crud/menus/dishes/read/read";
import { create_dish_without_image } from "@/db/crud/menus/dishes/create/create";

export async function add_dish(data: any): Promise<ApiResponse> {
	try {

		const hotel_id: string | null = data['hotel_id'];
		const dish_name: string | null = data['dish_name'];
		const dish_code: string | null = data['dish_code'];
		const dish_type: string | null = data['dish_type'];
		const description: string | null = data['description'];
		const category_id: string | null = data['category_id'];

		// Default Invalid Checker
		if ( hotel_id == null || dish_name == null || dish_code == null || dish_type == null || category_id == null ) {
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
