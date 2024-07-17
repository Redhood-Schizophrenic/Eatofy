import { ApiResponse } from "@/types/ApiResponse";
import { update_dish_details } from "@/db/crud/menus/dishes/update/update";
import { read_dish } from "@/db/crud/menus/dishes/read/read";

export async function update_details(data: any): Promise<ApiResponse> {
	try {

		const hotel_id: string | null = data['hotel_id'];
		const dish_id: string | null = data['dish_id'];
		const dish_name: string | null = data['dish_name'];
		const dish_code: string | null = data['dish_code'];
		const dish_type: string | null = data['dish_type'];
		const description: string | null = data['description'];

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

		return {
			returncode: 200,
			message: "Dish details Updated.",
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
