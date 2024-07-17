import { ApiResponse } from "@/types/ApiResponse";
import { read_items } from "@/db/crud/inventory/items/read";

export async function fetch_items(data: any): Promise<ApiResponse> {
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

		// Getting the Items
		const result = await read_items({
			hotel_id
		});

		return {
			returncode: 200,
			message: "Hotel's items Fetched",
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
