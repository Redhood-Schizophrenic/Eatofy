import { ApiResponse } from "@/types/ApiResponse";
import { read_menu_categories } from "@/db/crud/menus/category/read";

export async function fetch_menu_categories(data: any): Promise<ApiResponse> {
	try {

		const hotel_id: string | null = data['hotel_id'];

		// Default Invalid Checker
		if ( hotel_id == null ) {
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

		return {
			returncode: 200,
			message: "Section Fetched",
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
