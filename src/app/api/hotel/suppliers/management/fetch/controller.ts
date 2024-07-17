import { ApiResponse } from "@/types/ApiResponse";
import { read_suppliers } from "@/db/crud/inventory/suppliers/read";

export async function fetch_suppliers(data: any): Promise<ApiResponse> {
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

		// Getting the Sections
		const result = await read_suppliers({
			hotel_id
		});

		return {
			returncode: 200,
			message: "Hotel's Suppliers Fetched",
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
