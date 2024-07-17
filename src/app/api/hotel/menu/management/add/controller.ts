import { ApiResponse } from "@/types/ApiResponse";
import { read_menu } from "@/db/crud/menus/management/read";
import { create_menu } from "@/db/crud/menus/management/create";

export async function add_menu(data: any): Promise<ApiResponse> {
	try {

		const dish_id: string | null = data['dish_id'];
		const section_id: string | null = data['section_id'];
		const code: string | null = data['code'];
		const price: number | null = data['price'];

		// Default Invalid Checker
		if ( dish_id == null || section_id == null || price == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Existing Dish 
		const existingDish = await read_menu({ dish_id });
		if ( existingDish.returncode == 200 ) {
			return existingDish;
		}

		// Inserting the Dish
		const result = await create_menu({
			dish_id,
			section_id,
			code,
			price
		});

		return {
			returncode: 200,
			message: "Menu Added",
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
