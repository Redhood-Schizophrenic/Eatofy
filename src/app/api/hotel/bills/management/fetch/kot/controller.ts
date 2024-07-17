import { ApiResponse } from "@/types/ApiResponse";
import { kot_display } from "@/db/crud/orders/management/read";

export async function fetch_kot_bill(data: any): Promise<ApiResponse> {
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
		const result = await kot_display({
			hotel_id
		});

		return {
			returncode: 200,
			message: "Kot orders Fetched",
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
