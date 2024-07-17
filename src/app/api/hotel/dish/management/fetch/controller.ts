import { ApiResponse } from "@/types/ApiResponse";
import { read_dishes } from "@/db/crud/menus/dishes/read/read";

export async function fetch_dishes(data: any): Promise<ApiResponse> {
	try {

		const hotel_id: string | null = data['hotel_id'];

		// Default Invalid Checker
		if (hotel_id == null) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Getting the Dishes
		let result = await read_dishes({
			hotel_id
		});

		// Base64 encoded
		result.output.forEach((record: any) => {
			record.DishImage = record.DishImage?.toString('base64');
		});

		return {
			returncode: 200,
			message: "Hotel's Dishes Fetched",
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
