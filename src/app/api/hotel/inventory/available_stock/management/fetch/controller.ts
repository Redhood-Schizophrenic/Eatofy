import { ApiResponse } from "@/types/ApiResponse";
import { read_available_stock } from "@/db/crud/inventory/available_stock/read";

export async function fetch_available_stock(data: any): Promise<ApiResponse> {
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

		// Getting the Stock
		const result = await read_available_stock({
			hotel_id
		});

		return {
			returncode: 200,
			message: "Hotel's Available Stock Fetched",
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
