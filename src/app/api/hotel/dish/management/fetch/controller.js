import { read_dishes } from "@/db/crud/menus/dishes/read/read";

export async function fetch_dishes(data) {
	try {

		const hotel_id = data['hotel_id'] || null;

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
		result.output.forEach((record) => {
			record.DishImage = record.DishImage?.toString('base64');
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
